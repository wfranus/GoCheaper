'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

class BarCodeInfoScreen extends Component {
  constructor(props) {
    super(props);

    this.barCode = this.props.barCode;
    //this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}> Bar code: {this.barCode} </Text>
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
