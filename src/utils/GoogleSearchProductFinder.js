import {API_key, cx_key} from './API_KEYS'

const BASE_URL = 'https://www.googleapis.com/customsearch/v1'

class GoogleSearchProductFinder {
  constructor(props) {
    this.API_key = API_key;
    this.jsonResponse = null;
  }

  async searchForProduct(productStr, callback) {
    let queryString = objToQueryString({
        q: encodeURIComponent(productStr),
        cx: cx_key,
        key: API_key,
        searchType: "image",
        imgType: "photo",
        //googlehost: "google.pl",
        //cr: "countryPL",
        //gl: "pl", //geolocation,
        //lr: "lang_pl",
        filter: 0,
        num: 3, // Number of search results to return
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
