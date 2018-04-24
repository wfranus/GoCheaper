'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
  ScrollView
} from 'react-native';

import GoogleSearchProductFinder from '../GoogleSearchProductFinder'

class BarCodeInfoScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      barCode: this.props.navigation.state.barCode,
      results: "null"
    }

    this.search = GoogleSearchProductFinder.bind(this);
  }

  //FIXME: is this the right place for this?
  componentDidMount() {
    this.search(this.state.barCode, (results) => {
      console.log(results);
      this.setState(
        { results: JSON.stringify(results) }
      )
    });
  }

  render() {
    const { params } = this.props.navigation.state;
    const barCode = params ? params.barCode : 'eh..';

    return (
      //<View style={styles.container}>
      // <WebView
      //   source={{uri: 'https://allegro.pl'}}
      //   style={{marginTop: 20}}
      // />
      <ScrollView>
      <Text>Google search results for bar code: {barCode}</Text>
      <Text>{this.state.results}</Text>
      </ScrollView>
      //</View>
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
