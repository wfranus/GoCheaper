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
  ActivityIndicator,
  TextInput
} from 'react-native';
import { Icon, Button, Divider } from 'react-native-elements';
import colors from './config/colors';
import Modal from "react-native-modal";
import { connect } from "react-redux";
import Loader from './Loader';
import PriceInputModal from './PriceInputModal'
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
    }

    this.ProductFinder = new ProductFinder();
    this.ProductFinder.find.bind(this);
  }

  //FIXME: is this the right place for this?
  componentDidMount() {
    this.setState({
      loading: true
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
      this.props.navigation.navigate('SavingsSummary');
  }

  render() {
    const {
      barCode,
      productName,
      userPrice
    } = this.props;

    return (
      <View style={styles.container}>
        <Loader
          loading={this.state.loading}
          message="Rozpoznawanie produktu"/>
        {!this.state.loading && <View style={styles.container}>
          <View style={styles.productInfoView}>
          <Text style={styles.label}>Kod kreskowy:</Text>
            <Text style={styles.barCode}>{barCode}</Text>
            <Text style={styles.label}>Nazwa produktu:</Text>
            <Text style={styles.productName}>{productName}</Text>
            <Button
              containerViewStyle={styles.buttonContainer}
              buttonStyle={styles.buttonWrong}
              titleStyle={styles.buttonText}
              icon={{name: 'edit', size:15, color:'black'}}
              title='Popraw' />
          </View>
          <Divider style={{backgroundColor: 'black', marginTop: 10 }} />
          <View style={styles.buttonsView}>
            <Text style={styles.label}>Twoja cena:</Text>
            <Text style={styles.productName}>{userPrice.toFixed(2)} zł</Text>
            <Button
              containerViewStyle={styles.buttonContainer}
              buttonStyle={styles.buttonOk}
              titleStyle={styles.buttonText}
              onPress={() => this.setState({showPriceModal: true})}
              icon={{name: 'usd', type:'font-awesome', size:20, color:'black', paddingLeft: 5}}
              title='Wpisz swoją cenę' />
          </View>
        </View>}
        <Modal
          isVisible={this.state.showPriceModal}
          animationIn="bounceIn"
          animationInTiming={600}
          // animationOut="bounceOut"
          // animationInTiming={600}
          style={{justifyContent: 'space-around', alignItems: 'center'}}
          onBackButtonPress={() => this.setState({showPriceModal:false})}
          onBackdropPress={() => this.setState({showPriceModal:false})}
        >
         <PriceInputModal
            onSubmit={(price) => this.onPriceSubmit(price)}
          />
        </Modal>
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
    margin: 15,
    borderRadius: 10,
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
  buttonsView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent:'space-around',
    alignItems: 'center',
    backgroundColor: 'white'//'rgb(36, 108, 134)'
  },
  label: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  barCode: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    marginBottom: 20,
    color: 'black'
  },
  productName: {
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black',
    //marginBottom: 10,
  },
  buttonContainer: {
    borderRadius: 7
  },
  buttonOk: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: colors.green,
  },
  buttonWrong: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
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
