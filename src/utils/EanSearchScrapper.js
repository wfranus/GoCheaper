import cheerio from 'react-native-cheerio';

const BASE_URL = 'https://www.ean-search.org/perl/ean-search.pl';

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
    const $ = cheerio.load(response);
    return $("a", "#main").find.text();
  }
}

export default EanSearchScrapper
