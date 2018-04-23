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

class ScannerScreen extends Component {

  static navigationOptions = {
    title: 'Some',
    header: null
  };


  constructor(props) {
    super(props);
    console.log("ScannerScreen C-tor");

    this.state = {
      barCode: ''
    }

    this.onBarCodeRead = this.onBarCodeRead.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}> GoCheaper </Text>
        </View>
        <RNCamera
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
        />
      </View>
    );
  }

  onBarCodeRead (e) {
    // return if code already scanned
    if (this.state.barCode === e.data) {
      return null;
    }

    return this.setState({
      barCode: e.data
    }, () => {
      // if (Platform.OS === 'ios') {
      //   Vibration.vibrate(500, false);
      // } else {
      //   Vibration.vibrate([0, 500], false);
      // }
      this.setState({hideCamera:true})
      this.props.navigation.navigate(
        'BarCodeInfo',
        {barCode: this.state.barCode}
      );
    });
  };
}

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
