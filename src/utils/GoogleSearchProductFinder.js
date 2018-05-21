'use strict'
import {API_key, cx_key} from './API_KEYS'
import DOMParser from 'react-native-html-parser';
import cheerio from 'react-native-cheerio';
import { longestCommonSubstring } from 'string-algorithms';

const BASE_URL = 'https://www.googleapis.com/customsearch/v1'

class GoogleSearchProductFinder {
  constructor(props) {
    this.API_key = API_key;
    this.jsonResponse = null;
    this.textResponse = null;
  }

  /** Search with the use of Google Search **/
  async searchForProductV2(productStr, callback) {
    try {
      let queryString = objToQueryString({
          q: productStr,
          ie: "UTF-8",
          oe: "UTF-8",
          //tmb: "isch", // for image search
      });
      let response = await fetch(`https://www.google.pl/search?${queryString}`, {
        method: 'GET',
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'POST, GET'
        }
      });

      this.textResponse = await response.text();

      let productName = this.getPossibleProductName(this.textResponse, productStr);
      let photoUrl = null;

      callback({
        "name": productName,
        "photoUrl": photoUrl
      });
    } catch (error) {
      console.log(error);
    }
  }

  /** Search with the use of Google Custom Search API **/
  async searchForProduct(productStr, callback) {
    let queryString = objToQueryString({
        q: productStr,
        cx: cx_key,
        key: API_key,
        //searchType: "image",
        //imgType: "photo",
        //googlehost: "google.pl",
        //cr: "countryPL",
        //gl: "pl", //geolocation,
        //lr: "lang_pl",
        filter: 0,
        num: 1, // Number of search results to return
        //start: 0, // error when set to 0 ???
    });

    try {
      console.log("SEND");

      let response = await fetch(`${BASE_URL}?${queryString}`, {
        method: 'GET',
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'POST, GET'
        }
      });
      this.jsonResponse = await response.json();
      //console.log("Response:\n" +  JSON.stringify(this.jsonResponse));

      let numResults = this.getNumOfResultsFromResponse(this.jsonResponse);
      let productNames = numResults ? this.getItemsNamesFromResponse(this.jsonResponse, numResults) : null;
      let productName = (productNames && productNames.length) ? productNames[0] : null;
      let photoUrl = numResults ? this.getPhotoUrlOfItemFromResponse(this.jsonResponse, 0) : null;
      console.log(photoUrl);
      console.log(numResults);

      callback({
        "name": productName,
        "photoUrl": photoUrl
      });
    } catch(error) {
      console.log(error);
    }
  }

  getResultsTitlesFromHTMLresponse(response) {
    const $ = cheerio.load(response)
    //console.log("PARSED RESULTS:");
    let results = [];
    $("a", "h3").each(function(i, elem) {
      results[i] = $(this).text();
    });
    //console.log(results.toString());
    return results;
  }

  getPossibleProductName(response, barCode) {
    let resultsList = this.getResultsTitlesFromHTMLresponse(this.textResponse);
    if (!resultsList.length) { return "";}

    // to lowercase and remove all "..."
    resultsList = resultsList.map(t => t.toLowerCase().replace(/\.\.\./g, ""));

    // delete 'Obrazy dla <barCode>' from results list
    let toDel = 'obrazy dla';
    resultsList = resultsList.filter(item => {return item.indexOf(toDel) == -1;});

    // delete bar code string from titles
    if (typeof barCode !== 'undefined') {
      let re = new RegExp(barCode, "g");
      resultsList = resultsList.map(t => t.replace(re, ""));
    }

    // compute longest common substring for all unique result pairs
    // and choose the longest of them
    let howMany = Math.min(4, resultsList.length);
    let cmnStrList = [];

    //console.log("searching within ", howMany)
    for (let i=0; i < howMany; ++i) {
      for (let j=i+1; j < howMany; ++j) {
        let resPair = [resultsList[i], resultsList[j]];
        cmnStrList = cmnStrList.concat(longestCommonSubstring(resPair));
      }
    }

    //console.log("Lonest common strings: ", cmnStrList.toString());
    let productName = cmnStrList.reduce((p, c) => p.length > c.length ? p : c);

    // filtering
    productName = productName.trim();
    if (productName.endsWith('-')) {
      productName = productName.substring(0, productName.length - 1)
    }
    if (productName.startsWith('-')) {
      productName = productName.substring(1)
    }
    productName = productName.trim();
    //console.log("longest: ", productName);

    let minLen = 3;
    if (productName.length < minLen) {
      console.log("too short");
      return "";
    }

    return productName;
  }

  getNumOfResultsFromResponse(response) {
    try {
      return parseInt(response["searchInformation"]["totalResults"]);
    } catch (e) {
      console.log("Unexpected error while parsing Google Search response: " + e);
      return null;
    }
  }

  getItemsNamesFromResponse(response, numOfItems) {
    let itemsList = [];
    let itemsNames = [];

    try {
      itemsList = response["items"];

      if (!numOfItems || numOfItems > itemsList.length) {
        console.log("numOfItems is greater than items list size!");
        return null;
      } else {
        for (let i=0; i < numOfItems; ++i) {
          itemsNames.push(itemsList[i]['title']);
        }
      }
    } catch (e) {
      console.log("Error while getting items names from response!: " + e);
      return null;
    }

    return itemsNames;
  }

  getPhotoUrlOfItemFromResponse(response, itemIndex) {
    try {
      let itemsList = response["items"];

      if (itemIndex > itemsList.length - 1) {
        console.log("itemIndex is greater than items list size!");
        return null;
      } else {
        return itemsList[itemIndex]["link"];
      }
    } catch (e) {
      console.log("Error while getting photo url from response!")
      return null;
    }
  }
}

function objToQueryString(obj) {
  const keyValues = [];
  for (const key in obj) {
    keyValues.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValues.join('&');
}

export default GoogleSearchProductFinder
