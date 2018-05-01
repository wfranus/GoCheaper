import {API_key, cx_key} from './API_KEYS'

const BASE_URL = 'https://www.googleapis.com/customsearch/v1'

const GoogleSearchProductFinder = function (barCode, callback) {
console.log("API KEY:", API_key, "query: ", barCode);
  let queryString = objToQueryString({
      q: encodeURIComponent(barCode),
      cx: cx_key,
      key: API_key,
      //googlehost: "google.pl",
      //cr: "countryPL",
      //gl: "pl", //geolocation,
      lr: "lang_pl",
      num: 1, // Number of search results to return
      //start: 0, // error when set to 0 ???
  });

  return fetch(`${BASE_URL}?${queryString}`, {
    method: 'GET',
    headers:{
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials':true,
      'Access-Control-Allow-Methods':'POST, GET'
    }
  })
  .then((response) => response.json())
  .then((json) => {
    console.log("Response : ", json)
    callback(json);
  })
  .catch((error) => {console.log(error)})
}

function objToQueryString(obj) {
  const keyValues = [];
  for (const key in obj) {
    keyValues.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValues.join('&');
}

export default GoogleSearchProductFinder
