'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RNCamera } from 'react-native-camera';

class ScannerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barCode: ''
    }
    //console.log(this.props)
    this.onBarCodeRead = this.onBarCodeRead.bind(this);
    //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
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
            flashMode={RNCamera.Constants.FlashMode.off}
            autoFocus={RNCamera.Constants.AutoFocus.on}
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
      return;
    }

    this.state.barCode = e.data;
    console.log(this.state.barCode);

    this.props.navigator.push({
      screen: 'GoCheaper.BarCodeInfoScreen',
      title: 'Bar code recognized!',
      passProps: {barCode: this.state.barCode}
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
