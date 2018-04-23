'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView
} from 'react-native';

class BarCodeInfoScreen extends Component {
  constructor(props) {
    super(props);

    //this.barCode = this.props.navigation.state.barCode;
  }

  render() {
    const { params } = this.props.navigation.state;
    const barCode = params ? params.barCode : 'eh..'

    return (
      <View style={styles.container}>
      <WebView
        source={{uri: 'https://allegro.pl'}}
        style={{marginTop: 20}}
      />
      <Text style={styles.headerText}> Bar code: {barCode} </Text>
      </View>
    );
  }
}

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
  }
});

export default BarCodeInfoScreen;
