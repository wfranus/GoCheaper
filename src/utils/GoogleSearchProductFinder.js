import {API_key, cx_key} from './API_KEYS'
import DOMParser from 'react-native-html-parser';
import cheerio from 'react-native-cheerio';

const BASE_URL = 'https://www.googleapis.com/customsearch/v1'

class GoogleSearchProductFinder {
  constructor(props) {
    this.API_key = API_key;
    this.jsonResponse = null;
    this.textResponse = null;
  }

  async searchForProductV2(productStr, callback) {
    try {
      let response = await fetch(`https://www.google.pl/search?q=${productStr}`, {
        method: 'GET',
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'POST, GET'
        }
      });

      this.textResponse = await response.text();

      let resultsList = this.getResultsTitlesFromHTMLresponse(this.textResponse);
      let numResults = resultsList.length;
      let productName = numResults ? resultsList[0] : null;
      let photoUrl = null;

      callback({
        "name": productName,
        "photoUrl": photoUrl
      });
    } catch (error) {
      console.log(error);
    }
  }

  async searchForProduct(productStr, callback) {
    let queryString = objToQueryString({
        q: encodeURIComponent(productStr),
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
    console.log("PARSED RESULTS:");
    let results = [];
    $("a", "h3").each(function(i, elem) {
      results[i] = $(this).text();
    });
    console.table(results);
    return results;
  }

  parseHTMLresponse(response) {
    // const parser = new DOMParser.DOMParser();
    // const doc = parser.parseFromString(response, 'text/html');
    // console.log(doc.getElementsByTagName('a'));
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

  create
}

function objToQueryString(obj) {
  const keyValues = [];
  for (const key in obj) {
    keyValues.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValues.join('&');
}

export default GoogleSearchProductFinder
