'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  Platform,
  Button,
  View
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation'
import { connect } from "react-redux";
import {setProductProp, resetProduct} from "../actions/productActions"
import {turnOnCamera, turnOffCamera} from "../actions/cameraActions"


class ScannerScreen extends Component {

  /* NAVIGATION */
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerLeft: <Icon name={'arrow-back'}
                       iconStyle={{marginRight: 10}}
                       color='transparent' />,
  });

  constructor(props) {
    super(props);
    console.log("ScannerScreen C-tor");

    this.onShowingUp = this.onShowingUp.bind(this);
    this.onBarCodeRead = this.onBarCodeRead.bind(this);
  }

  onShowingUp() {
    this.props.turnOnCamera();
    this.props.resetProduct();
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.cameraTurnedOn && <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.auto}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            onCameraReady = {() => console.log("Camera READY!")}
            onMountError={() => console.log("Cam mount error")}
            onBarCodeRead={(data) => this.onBarCodeRead(data)}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />}
      </View>
    );
  }

  onBarCodeRead (e) {
    console.log("BARCODE!")
    // return if code already scanned
    if (this.props.barCode === e.data) {
      return null;
    }

    this.props.setBarCode(e.data);

    if (Platform.OS === 'ios') {
      Vibration.vibrate(300, false);
    } else {
      Vibration.vibrate([0, 300], false);
    }

    this.props.turnOffCamera();
    this.props.navigation.navigate('BarCodeInfo', {onGoBack: this.onShowingUp.bind(this)});
  };
}

const mapStateToProps = state => ({
  cameraTurnedOn: state.camera.turnedOn,
  barCode: state.product.barCode
});

const mapDispatchToProps = dispatch => ({
  turnOffCamera: () => { dispatch(turnOffCamera()) },
  turnOnCamera: () => { dispatch(turnOnCamera()) },
  resetProduct: () => {dispatch(resetProduct())},
  setBarCode: (newBarCode) => { dispatch(setProductProp("barCode", newBarCode))},
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 3,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ScannerScreen);
