'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Linking
} from 'react-native';
import { Icon, Button, Badge, Card } from 'react-native-elements';
import Modal from "react-native-modal";
import { connect } from "react-redux";
import Loader from './Loader';
import SavingsCard from './SavingsCard';
import NoBetterPriceCard from './NoBetterPriceCard'
import colors from './config/colors';
import AllegroScrapper from '../utils/AllegroScrapper';
import {setProductProp} from "../actions/productActions";

class SavingsSummaryScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      onlineCheaper: true,
      anyResultsFound: false,
      allegroSavePercent: 0,
      allegroMinPrice: 0.0,
      allegroSaveAmount: 0.0,
      allegroItemsListingUrl: null
    }

    this.AllegroScrapper = new AllegroScrapper(this.props.settings);
    this.AllegroScrapper.getMinPriceForItem.bind(this);
    this.AllegroScrapper.createItemsListSearchUrl.bind(this);
    //this.onShowAuctionsButtonPress = this.onShowAuctionsButtonPress.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: true
    });

    this.AllegroScrapper.getMinPriceForItem(this.props.productName, (results) => {
        if (!results) { return; }

        const {minPrice, resultsNum} = results;
        const {userPrice, productName} = this.props;

        if (!minPrice || !resultsNum) {
          console.log("No results for this product!");

          return this.setState({
            onlineCheaper: false,
            anyResultsFound: false,
            allegroMinPrice: null,
            loading: false,
          });
        } else {
          let allegroUrl = this.AllegroScrapper.createItemsListSearchUrl(productName);
          let onlineCheaper = minPrice <= userPrice;
          let allegroSaveAmount = onlineCheaper
            ? parseFloat(userPrice - minPrice).toFixed(2) : 0.0;
          let allegroSavePercent = onlineCheaper
            ? Math.round(allegroSaveAmount*100/userPrice) : 0;

          this.props.setProductMinPrice(minPrice);
          this.setState({
            onlineCheaper: onlineCheaper,
            anyResultsFound: true,
            allegroSavePercent: allegroSavePercent,
            allegroMinPrice: minPrice,
            allegroSaveAmount: allegroSaveAmount,
            allegroItemsListingUrl: allegroUrl,
            loading: false,
          });
        }
    });
  }

  onShowAuctionsButtonPress() {
    console.log("Opening URL: " + this.state.allegroItemsListingUrl);
    Linking.openURL(this.state.allegroItemsListingUrl).catch(err =>
      console.error('An error occurred', err));
  }

  render() {
    const {
      barCode,
      productName,
      userPrice,
    } = this.props;

    const showAuctionsButtonTitle = this.state.anyResultsFound
      ? 'Pokaż aukcje' : 'Brak aukcji';


    return (
      <View style={styles.container}>
        <Loader
          loading={this.state.loading}
          message="Sprawdzanie cen on-line"/>
        {!this.state.loading
          && <View style={styles.container}>
          <View style={styles.productInfoView}>
            <Text style={styles.barCode}>{barCode}</Text>
            <Text style={styles.productName}>{productName}</Text>
            <Badge containerStyle={{ backgroundColor: '#464646'}}>
              <Text style={styles.productPrice}>Twoja cena: {userPrice.toFixed(2)} zł</Text>
            </Badge>
          </View>
          <View style={styles.onlineShopView}>
            {this.state.onlineCheaper &&
              <SavingsCard
                animated={true}
                shopName='Allegro.pl'
                minPrice={this.state.allegroMinPrice}
                saveAmount={this.state.allegroSaveAmount}
                savePercent={this.state.allegroSavePercent}
                color={colors.allegro}
                buttonDisabled={!this.state.anyResultsFound}
                buttonTitle={showAuctionsButtonTitle}
                onButtonPress={() => this.onShowAuctionsButtonPress()}/>
            }
            {!this.state.onlineCheaper &&
              <NoBetterPriceCard
                animated={true}
                shopName='Allegro.pl'
                minPrice={this.state.allegroMinPrice}
                color={colors.allegro}
                buttonDisabled={!this.state.anyResultsFound}
                buttonTitle={showAuctionsButtonTitle}
                onButtonPress={() => this.onShowAuctionsButtonPress()}/>
            }
          </View>
        </View>}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  barCode: state.product.barCode,
  productName: state.product.name,
  userPrice: state.product.userPrice,
  minPrice: state.product.minPrice,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  setProductMinPrice: (price) => { dispatch(setProductProp("minPrice", price))}
});

export default connect(mapStateToProps, mapDispatchToProps)(SavingsSummaryScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //margin:10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  productInfoView: {
    flex: 1,
    margin: 15,
    marginBottom: 0,
    justifyContent:'space-around',
    alignItems: 'center',
    //backgroundColor: 'rgb(242, 242, 242)',
  },
  onlineShopView: {
    flex: 3,
    justifyContent: 'center',
    //backgroundColor: 'red'
  },
  barCode: {
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'Helvetica',
  },
  productName: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    //borderWidth: 1,
    padding: 15
  },
  productPrice: {
    alignSelf: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'white'
  },
});
