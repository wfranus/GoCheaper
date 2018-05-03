import {AllegroAPI_key} from './API_KEYS'
import SoapRequest from 'react-native-soap-request'

// const BASE_URL = 'https://webapi.allegro.pl.webapisandbox.pl/service.php?wsdl'
const API_BASE_URL = 'https://webapi.allegro.pl/service.php'

class AllegroScrapper {
  constructor(props) {
    this.API_key = AllegroAPI_key;
    this.soapRequest = new SoapRequest({
      requestURL: API_BASE_URL,
      elemNameForArrayItem: "item"
    });
    this.jsonResponse = null;
  }

  async searchForProduct(productStr, callback) {
    let filters = [
      this.createFilter("search", [productStr]), //TODO: escape special chars?
      this.createFilter("description", ["true"]),
      this.createFilter("condition", ["new"])
      // this.createFilter("price", null, 1.0, 100.0),
      // this.createFilter("offerType", ["buyNow"]), //buyNow/auction
      // this.createFilter("departament", ["fashionBeauty"]),
      // this.createFilter("category", [1]), //category is int
    ];
    let sortOptions = {
      "sortType": "price", // endingTime/startingTime/price/priceDelivery/popularity/name/relevance
      "sortOrder": "asc" // scd/desc
    };
    let request = this.createSearchRequest(productStr, filters, sortOptions);
    await this.sendRequest();

    let productNames = this.getItemsNamesFromResponse(this.jsonResponse, 2);
    let productName = (productNames !== null && productNames.length) ? productNames[0] : null;

    callback({
      "name": productName,
      "photoUrl": this.getPhotoUrlOfItemFromResponse(this.jsonResponse, 0)
    });
  }

  getItemsNamesFromResponse(response, numOfItems) {
    let itemsList = [];
    let itemsNames = [];

    try {
      if (numOfItems > parseInt(response["ns1:itemsCount"][0])) {
        console.log("Not enough items in response");
        return [];
      }
      itemsList = response["ns1:itemsList"][0]["ns1:item"];

      if (numOfItems <= itemsList.length) {
        for (let i=0; i < numOfItems; ++i) {
          itemsNames.push(itemsList[i]['ns1:itemTitle'][0]);
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
      let url = response["ns1:itemsList"][0]["ns1:item"][itemIndex]["ns1:photosInfo"][0]["ns1:item"][2]["ns1:photoUrl"][0];
      console.log("\nURL\n" + JSON.stringify(url));
      return url;
    } catch (e) {
      console.log("Error while getting photo url from response!")
      return null;
    }
  }

  // value is of Array type
  createFilter(filterId, value, rangeValueMin, rangeValueMax) {
    let filter = {
      "filterId" : filterId
    };

    if (typeof value !== 'undefined' && value !== null) {
      filter['filterValueId'] = value;
    }

    if (typeof rangeValueMin !== 'undefined' && typeof rangeValueMax !== 'undefined') {
      filter['filterValueRange'] = {};

      if (rangeValueMin !== null) {
        filter['filterValueRange']['rangeValueMin'] = rangeValueMin;
      }

      if (rangeValueMax !== null) {
        filter['filterValueRange']['rangeValueMax'] = rangeValueMax;
      }
    }

    return filter;
  }

  createSearchRequest(query, filters, sortOptions) {
    return this.soapRequest.createRequest({
      'DoGetItemsListRequest': {
        attributes: {
          'xmlns': API_BASE_URL,
        },
        'webapiKey': this.API_key,
        'countryId': 1, // Poland
        'filterOptions': filters,
        "sortOptions": sortOptions,
        'resultSize': 10,
        'resultScope': 3, /*Sterowanie zakresem zwracanych danych (maska, wartości można sumować): 1 - nie zwracaj struktury z filtrami, 2 - nie zwracaj struktury z kategoriami, 4 - nie zwracaj struktury z ofertami). Domyślnie zwracane są wszystkie dane.*/
      }
    });
  }

  async sendRequest() {
    const response = await this.soapRequest.sendRequest();
    console.log("FORMATTED RESPONSE:" + JSON.stringify(response));
    this.jsonResponse = this.parseResponse(response);
    console.log("\nPARSED RESPONSE\n: " + JSON.stringify(this.jsonResponse));
  }

  parseResponse (response) {
    // Removes SOAP wrappings from json response
    let parsedResponse = {};

    try {
      parsedResponse = response["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0];
      let methodResponseName = Object.keys(parsedResponse)[0];
      parsedResponse = parsedResponse[methodResponseName][0];
    } catch (e) {
      console.log("Response from Allegro API is in wrong format")
      return null;
    }

    return parsedResponse;
  }
}

export default AllegroScrapper
