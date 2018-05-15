import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  ActivityIndicator
} from 'react-native';
let Spinner = require('react-native-spinkit');

class Loader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={this.props.loading}
        onRequestClose={() => {console.log('close modal')}}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <Text style={styles.message}>{this.props.message}</Text>
            <Spinner
              type="ThreeBounce"
              size={80}
              isVisible={this.props.loading} />
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'rgb(59, 59, 59)'//'#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: 'rgb(211, 216, 254)',//'#FFFFFF',
    height: 200,
    width: 200,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    color: 'black',
    fontFamily: 'monospace',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    // textShadowColor: 'rgb(54, 54, 54)',
    // textShadowOffset: {width: -1, height: 1},
    // textShadowRadius: 10
  }
});

export default Loader;
