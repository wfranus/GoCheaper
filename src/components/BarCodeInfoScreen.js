'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
  ScrollView,
  Image,
  ActivityIndicator
} from 'react-native';
import { connect } from "react-redux";

import GoogleSearchProductFinder from '../utils/GoogleSearchProductFinder';
import AllegroScrapper from '../utils/AllegroScrapper';
import Loader from './Loader';

import {setProductProp} from "../actions/productActions"

class BarCodeInfoScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      results: ""
    }

    this.GoogleSearchProductFinder = new GoogleSearchProductFinder();
    this.GoogleSearchProductFinder.searchForProduct.bind(this);
    this.allegroScrapper = new AllegroScrapper();
    this.allegroScrapper.searchForProduct.bind(this);
  }

  //FIXME: is this the right place for this?
  componentDidMount() {
    this.setState({
      loading: true
    });

    this.GoogleSearchProductFinder.searchForProduct(this.props.barCode, (productInfo) => {
        if (!productInfo) {console.log("NULL"); return; }

        this.props.setProductName(productInfo.name);
        this.props.setProductPhotoUrl(productInfo.photoUrl);
        this.setState({
          loading: false
        });
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

  render() {
    // const { params } = this.props.navigation.state;
    // const barCode = params ? params.barCode : 'eh..';

    //<ScrollView>
          //<Text>{this.state.results}</Text>
          //</ScrollView>
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} />
        <View style={{flex:2}}>
          <Text>Scanned barcode: {this.props.barCode}</Text>
          <Text>Product name: {this.props.productName}</Text>
        </View>
        <View style={styles.imageView}>
          <Image
            style={styles.productPhoto}
            source={{uri: this.props.photoUrl}}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  //cameraTurnedOn: state.CameraReducer.turnedOn,
  barCode: state.product.barCode,
  productName: state.product.name,
  photoUrl: state.product.photoUrl
});

const mapDispatchToProps = dispatch => ({
  setProductName: (name) => { dispatch(setProductProp("name", name))},
  setProductPhotoUrl: (photoUrl) => { dispatch(setProductProp("photoUrl", photoUrl))},
});

export default connect(mapStateToProps, mapDispatchToProps)(BarCodeInfoScreen);

const styles = StyleSheet.create({
  headerText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    textShadowColor: '#fff'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  imageView: {
    flex: 3,
    flexDirection: 'row'
  },
  productPhoto: {
    flex: 1,
    //width: 50,
    height: null
  }
});
