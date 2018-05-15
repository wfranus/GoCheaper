import GoogleSearchProductFinder from '../utils/GoogleSearchProductFinder';
import AllegroScrapper from '../utils/AllegroScrapper';
// import EanSearchScrapper from '../utils/EanSearchScrapper';

class ProductFinder {
  constructor(props) {
    this.GoogleSearchProductFinder = new GoogleSearchProductFinder();
    this.GoogleSearchProductFinder.searchForProductV2.bind(this);
    this.allegroScrapper = new AllegroScrapper();
    this.allegroScrapper.searchForProduct.bind(this);
    // this.EanSearchScrapper = new EanSearchScrapper();
    // this.EanSearchScrapper.searchForProduct.bind(this);
  }

  /** Search with the use of Google Search **/
  async find(productStr, callback) {
    // this.EanSearchScrapper.searchForProduct(this.props.barCode, (productInfo) => {
    //     if (!productInfo) {console.log("NULL"); return; }
    //
    //     this.props.setProductName(productInfo.name);
    //     this.props.setProductPhotoUrl(productInfo.photoUrl);
    //     this.setState({
    //       loading: false
    //     });
    // });

    this.GoogleSearchProductFinder.searchForProductV2(productStr, (productInfo) => {
        callback(productInfo);
    });

    // this.allegroScrapper.searchForProduct(this.props.barCode, (productInfo) => {
    //     if (!productInfo) return;
    //
    //     this.props.setProductName(productInfo.name);
    //     this.props.setProductPhotoUrl(productInfo.photoUrl);
    //     this.setState({
    //       loading: false
    //     });
    // });
  }
}

export default ProductFinder
