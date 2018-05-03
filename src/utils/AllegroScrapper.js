import {AllegroAPI_key} from './API_KEYS'
import SoapRequest from 'react-native-soap-request'

// const BASE_URL = 'https://webapi.allegro.pl.webapisandbox.pl/service.php?wsdl'
const API_BASE_URL = 'https://webapi.allegro.pl/service.php'

const AllegroScrapper = async function (barCode, callback) {
  const soapRequest = new SoapRequest({
    requestURL: API_BASE_URL,
    elemNameForArrayItem: "item"
  });

  const xmlRequest = soapRequest.createRequest({
    'DoGetItemsListRequest': {
      attributes: {
        'xmlns': API_BASE_URL,
      },
      'webapiKey': AllegroAPI_key,
      'countryId': 1,
      'filterOptions': [
        {
          "filterId": "search", // search in titles
          "filterValueId": [barCode] //TODO: special chars escaping??
        },
        {
          "filterId": "description", // search in descriptions and parameters
          "filterValueId": ["true"]
        },
        {
          "filterId": "price", // set price range
          "filterValueRange": {
            "rangeValueMin": "1.0",
            "rangeValueMax": "100.0"
          }
        }
        // {
        //   "filterId": "departament",
        //   "filterValueId": ["fashionBeauty"]
        // },
        // {
        //   "filterId": "category",
        //   "filterValueId": ["fashionBeauty"]
        // }
      ],
      'resultSize': 100
      //'resultScope': 3, /*Sterowanie zakresem zwracanych danych (maska, wartości można sumować): 1 - nie zwracaj struktury z filtrami, 2 - nie zwracaj struktury z kategoriami, 4 - nie zwracaj struktury z ofertami). Domyślnie zwracane są wszystkie dane.*/
    }
  });

  const response = await soapRequest.sendRequest();
  console.log("FORMATTED RESPONSE:" + JSON.stringify(response))

  function parseResponse (response) {
    let parsedResponse = {};

    try {
      parsedResponse = response["SOAP-ENV:Envelope"]["SOAP-ENV:Body"][0];
      let methodResponseName = Object.keys(parsedResponse)[0];
      parsedResponse = parsedResponse[methodResponseName];
    } catch (e) {
      console.log("Response from Allegro API is in wrong format")
      return null;
    }

    return parsedResponse;
  }

  callback(parseResponse(response));
}

export default AllegroScrapper
