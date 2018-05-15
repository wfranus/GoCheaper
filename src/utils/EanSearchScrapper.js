import cheerio from 'react-native-cheerio';

const BASE_URL = 'https://www.ean-search.org/perl/ean-search.pl'

class EanSearchScrapper {
  constructor(props) {
    this.textResponse = null;
  }

  async searchForProduct(productStr, callback) {
    try {
      let response = await fetch(`${BASE_URL}?q=${productStr}`, {
        method: 'GET',
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials':true,
          'Access-Control-Allow-Methods':'POST, GET'
        }
      });

      this.textResponse = await response.text();
      console.log("response:\n" + this.textResponse);

      let productName = this.getProductNameFromHTMLResponse(this.textResponse, productStr);
      let photoUrl = null;

      callback({
        "name": productName,
        "barCodeImg": photoUrl
      });
    } catch (error) {
      console.log(error);
    }
  }

  getProductNameFromHTMLResponse(response, eanCode) {
    const $ = cheerio.load(response)
    let productName = "";
    productName = $("a", "#main").find.text();
    console.log(productName);
    return productName;
  }
}

function objToQueryString(obj) {
  const keyValues = [];
  for (const key in obj) {
    keyValues.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }
  return keyValues.join('&');
}

export default EanSearchScrapper
