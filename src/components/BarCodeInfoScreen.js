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
import { Icon, Button } from 'react-native-elements'
import Modal from "react-native-modal";
import { connect } from "react-redux";
import Loader from './Loader';
import PriceInputModal from './PriceInputModal'
import ProductFinder from '../utils/ProductFinder';
import {setProductProp} from "../actions/productActions"

class BarCodeInfoScreen extends Component {

  /* NAVIGATION */
  static navigationOptions = ({ navigation, screenProps }) => ({
      title:  'Header Title',
      headerLeft: <Icon name={'arrow-back'}
                        onPress={ () => {
                          navigation.goBack(null);
                          navigation.state.params.onGoBack() }} />,
      headerRight: <Icon name={'settings'}
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
      //TODO: call Allegro search here
  }

  render() {
    return (
      <View style={styles.container}>
        <Loader
          loading={this.state.loading}
          message="Rozpoznawanie produktu"/>
        {!this.state.loading && <View style={styles.container}>
          <View style={styles.barCodeView}>
            <Text style={styles.barCode}>{this.props.barCode}</Text>
          </View>
          <View style={styles.productNameView}>
            <Text style={styles.productName}>{this.props.productName}</Text>
          </View>
          <View style={styles.buttonsView}>
            <Button
              raised
              containerViewStyle={styles.buttonContainer}
              buttonStyle={styles.buttonOk}
              textStyle={styles.buttonText}
              rounded={true}
              outline={true}
              onPress={() => this.setState({showPriceModal: true})}
              icon={{name: 'done', size:20, color:'black'}}
              title='OK' />
            <Button
              raised
              containerViewStyle={styles.buttonContainer}
              buttonStyle={styles.buttonWrong}
              textStyle={styles.buttonText}
              rounded={true}
              icon={{name: 'edit', size:20, color:'black'}}
              title='Wpisz nazwę' />
          </View>
        </View>}
        <Modal
          isVisible={this.state.showPriceModal}
          animationIn="bounceIn"
          animationInTiming={600}
          animationOut="bounceOut"
          animationInTiming={600}
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'rgb(235, 234, 181)'
  },
  barCodeView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'rgb(129, 249, 195)'
  },
  productNameView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'rgb(186, 61, 219)'
  },
  buttonsView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(36, 108, 134)'
  },
  barCode: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  productName: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
  buttonContainer: {
    borderRadius: 7
  },
  buttonOk: {
    backgroundColor: 'rgb(66, 255, 0)',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
  },
  buttonWrong: {
    backgroundColor: 'rgba(230, 20, 20, 0.1)',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'black',
  },
  buttonText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
});
