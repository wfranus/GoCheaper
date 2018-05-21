'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Icon, Button, Divider } from 'react-native-elements';
import colors from './config/colors';
import { connect } from "react-redux";
import Loader from './Loader';
import PriceInputModal from './PriceInputModal'
import ProductNameInputModal from './ProductNameInputModal'
import ProductFinder from '../utils/ProductFinder';
import {setProductProp} from "../actions/productActions"

class BarCodeInfoScreen extends Component {

  /* NAVIGATION */
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerLeft: <Icon name={'arrow-back'}
                      iconStyle={{marginLeft: 10}}
                      onPress={ () => {
                        navigation.goBack(null);
                        navigation.state.params.onGoBack() }} />,
    headerRight: <Icon name={'settings'}
                       iconStyle={{marginRight: 10}}
                       onPress={ () => { navigation.navigate('Settings') }} />,
  });

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      showPriceModal: false,
      showNameModal: false,
      isReadyToSearch: false
    }

    this.ProductFinder = new ProductFinder();
    this.ProductFinder.find.bind(this);
    //this.onSearchButtonPress = this.onSearchButtonPress.bind(this);
  }

  //FIXME: is this the right place for this?
  componentDidMount() {
    this.setState({
      loading: true,
      isReadyToSearch: true
    });

    this.ProductFinder.find(this.props.barCode, (productInfo) => {
        if (!productInfo) { return; }

        this.props.setProductName(productInfo.name);
        this.props.setProductPhotoUrl(productInfo.photoUrl);
        this.setState({
          loading: false
        });
    });
  }

  onPriceSubmit(price) {
      this.setState({
        showPriceModal: false
      });
      this.props.setProductPrice(price);
      //this.props.navigation.navigate('SavingsSummary');
  }

  onProductNameSubmit(name) {
      this.setState({
        showNameModal: false
      });
      this.props.setProductName(name);
      //this.props.navigation.navigate('SavingsSummary');
  }

  onSearchButtonPress() {
    this.props.navigation.navigate('SavingsSummary');
  }

  render() {
    const {
      barCode,
      productName,
      userPrice
    } = this.props;

    const priceColor = userPrice > 0.0 ? 'black' : 'red';
    const priceInitialValue = userPrice > 0.0 ? userPrice.toFixed(2) : "";

    return (
      <View style={styles.container}>
        <Loader
          loading={this.state.loading}
          message="Rozpoznawanie produktu"/>
        {!this.state.loading && <View style={styles.container}>
          <View style={styles.productInfoView}>
          <Text style={styles.label}>Kod kreskowy:</Text>
            <Text style={styles.productInfo}>{barCode}</Text>
            <Text style={styles.label}>Nazwa produktu:</Text>
            <Text style={styles.productInfo}>{productName}</Text>
            <Button
              containerViewStyle={styles.buttonContainer}
              buttonStyle={styles.buttonEdit}
              titleStyle={styles.buttonText}
              onPress={() => this.setState({showNameModal: true})}
              icon={{name: 'edit', size:15, color:'black'}}
              title='Popraw' />
            <Text style={styles.label}>Twoja cena:</Text>
            <Text style={[styles.productInfo, {color:priceColor}]}>
              {userPrice.toFixed(2)} zł
            </Text>
            <Button
              buttonStyle={styles.buttonEdit}
              titleStyle={styles.buttonText}
              onPress={() => this.setState({showPriceModal: true})}
              icon={{name: 'md-pricetag', type:'ionicon', size:20,
                color:'black', paddingLeft: 5}}
              title='Wpisz swoją cenę' />
          </View>
          <View style={styles.buttonsView}>
            <Button
              buttonStyle={styles.buttonSearch}
              textStyle={styles.buttonText}
              disabled={!this.state.isReadyToSearch}
              onPress={() => this.onSearchButtonPress()}
              icon={{name: 'whatshot', size:25, color: 'white'}}
              title='Sprawdź ile zaoszczędzisz' />
          </View>
        </View>}
          <ProductNameInputModal
             isVisible={this.state.showNameModal}
             hideAction={() => this.setState({showNameModal:false})}
             onSubmit={(name) => this.onProductNameSubmit(name)}
             initialValue={productName}
           />
          <PriceInputModal
            isVisible={this.state.showPriceModal}
            hideAction={() => this.setState({showPriceModal:false})}
            onSubmit={(price) => this.onPriceSubmit(price)}
            initialValue={priceInitialValue}
          />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  barCode: state.product.barCode,
  productName: state.product.name,
  userPrice: state.product.userPrice,
  photoUrl: state.product.photoUrl
});

const mapDispatchToProps = dispatch => ({
  setProductName: (name) => { dispatch(setProductProp("name", name))},
  setProductPrice: (price) => { dispatch(setProductProp("userPrice", price))},
  setProductPhotoUrl: (photoUrl) => { dispatch(setProductProp("photoUrl", photoUrl))},
});

export default connect(mapStateToProps, mapDispatchToProps)(BarCodeInfoScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  productInfoView: {
    flex: 4,
    justifyContent:'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  buttonsView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  label: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  productInfo: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    //marginBottom: 10,
    color: 'black'
  },
  buttonContainer: {
    borderRadius: 25
  },
  buttonEdit: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    paddingLeft: 5,
    paddingRight: 5
  },
  buttonSearch: {
    backgroundColor: colors.allegro,
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 5
  },
  buttonText: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
});
