import {AllegroAPI_key} from './API_KEYS'
import SoapRequest from 'react-native-soap-request'

// const BASE_URL = 'https://webapi.allegro.pl.webapisandbox.pl/service.php?wsdl'
const BASE_URL = 'https://webapi.allegro.pl/service.php?wsdl'

const AllegroScrapper = async function (barCode, callback) {
  const soapRequest = new SoapRequest({
    requestURL: BASE_URL
  });

  const xmlRequest = soapRequest.createRequest({
    'doGetItemsListRequest': {
      'soap:webapiKey': AllegroAPI_key,
      'soap:countryId': 1,
      'soap:resultSize': 100,
      //'soap:resultScope': 3, /*Sterowanie zakresem zwracanych danych (maska, wartości można sumować): 1 - nie zwracaj struktury z filtrami, 2 - nie zwracaj struktury z kategoriami, 4 - nie zwracaj struktury z ofertami). Domyślnie zwracane są wszystkie dane.*/
    }
  });

  const response = await soapRequest.sendRequest();
  console.log("FORMATTED RESPONSE:", response)
  callback(response);
}

export default AllegroScrapper
