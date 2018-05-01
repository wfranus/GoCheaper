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
import { NavigationActions } from 'react-navigation'
import { connect } from "react-redux";
import {setBarCode} from "../actions/productActions"
import {turnOnCamera, turnOffCamera} from "../actions/cameraActions"

// const resetAction = NavigationActions.reset({
//   index: 0,
//   actions: [
//     NavigationActions.navigate({ routeName: 'BarCodeInfo'}),
//     NavigationActions.navigate({ routeName: 'Scanner'})
//   ]
// })



class ScannerScreenView extends Component {

  static navigationOptions = {
    title: 'Some title',
    header: null
  };

  constructor(props) {
    super(props);
    console.log("ScannerScreen C-tor");

    // this.state = {
    //   barCode: '',
    //   cameraTurnedOn: props.cameraTurnedOn,
    // }

    this.onBarCodeRead = this.onBarCodeRead.bind(this);
  }

  // componentDidMount() {
  //   console.log("ScannerScreen didMount!")
  //   //InteractionManager.runAfterInteractions(() => this.setState({ ready: true });
  // }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}> GoCheaper </Text>
        </View>
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
    //this.props.showBarCodeInfoScreen();
    this.props.navigation.navigate('BarCodeInfo');
  };
}

const mapStateToProps = state => ({
  cameraTurnedOn: state.camera.turnedOn,
  barCode: state.product.barCode
});

const mapDispatchToProps = dispatch => ({
  turnOffCamera: () => { dispatch(turnOffCamera()) },
  turnOnCamera: () => { dispatch(turnOnCamera()) },
  setBarCode: (newBarCode) => { dispatch(setBarCode(newBarCode))},
  showBarCodeInfoScreen: () => {
    dispatch(NavigationActions.navigate({routeName: 'BarCodeInfo'}))
  }
});

const ScannerScreen = connect(mapStateToProps, mapDispatchToProps)(ScannerScreenView);

const styles = StyleSheet.create({
  header: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'rgba(85, 233, 237, 1)'
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    textShadowColor: '#fff'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});

export default ScannerScreen;
