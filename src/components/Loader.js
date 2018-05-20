import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  ActivityIndicator
} from 'react-native';
import { DotIndicator } from 'react-native-indicators';

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
            <DotIndicator
              count={3}
              size={12}
              animating={this.props.loading} />
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
    padding: 20,
    borderRadius: 10,
    display: 'flex',
    justifyContent:'space-around',
    alignItems:'center',
  },
  message: {
    color: 'black',
    //fontFamily: 'monospace',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default Loader;
