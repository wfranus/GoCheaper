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
import { connect } from "react-redux";

import GoogleSearchProductFinder from '../utils/GoogleSearchProductFinder'
import AllegroScrapper from '../utils/AllegroScrapper'

class BarCodeInfoScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      results: "null"
    }

    this.search = GoogleSearchProductFinder.bind(this);
    this.allegroScrapper = new AllegroScrapper();
  }

  //FIXME: is this the right place for this?
  componentDidMount() {
    // this.search(this.props.barCode, (results) => {
    //   console.log(results);
    //   this.setState(
    //     { results: JSON.stringify(results) }
    //   )
    // });
    this.allegroScrapper.searchForProduct(this.props.barCode, (results) => {
        this.setState(
          { results: JSON.stringify(results) }
        )
    });
  }

  render() {
    // const { params } = this.props.navigation.state;
    // const barCode = params ? params.barCode : 'eh..';

    return (
      <ScrollView>
      <Text>Google search results for bar code: {this.props.barCode}</Text>
      <Text>{this.state.results}</Text>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  //cameraTurnedOn: state.CameraReducer.turnedOn,
  barCode: state.product.barCode
});

export default connect(mapStateToProps)(BarCodeInfoScreen);

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
