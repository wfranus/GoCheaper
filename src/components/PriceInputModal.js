import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput
} from 'react-native';
import { Icon, Button } from 'react-native-elements'

class PriceInputModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: "0.00"
    }
  }

  onTextChanged(text) {
    // code to remove non-numeric characters from text
    this.setState({price: text})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Twoja cena (zł):</Text>
        <TextInput
          style={styles.priceInput}
          autoFocus={true}
          keyboardType = 'numeric'
          onChangeText = {(text)=> this.onTextChanged(text)}
          value = {this.state.value}
        />
        <Button
          raised
          containerViewStyle={styles.buttonContainer}
          buttonStyle={styles.buttonSearch}
          textStyle={styles.buttonText}
          rounded={true}
          outline={true}
          onPress={() => this.props.onSubmit(this.state.price)}
          icon={{name: 'whatshot', size:25}}
          title='Sprawdź czy oszczędzisz' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // modalBackground: {
  //   flex: 1,
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'space-around',
  //   backgroundColor: 'rgb(59, 59, 59)'//'#00000040'
  // },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgb(211, 216, 254)',//'#FFFFFF',
    height: 300,
    width: 300,
    borderRadius: 10,
  },
  message: {
    color: 'black',
    fontFamily: 'monospace',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  priceInput: {
    height: 60,
    width: 150,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    borderRadius: 10,
    //alignItems: 'center'
  },
  buttonSearch: {
    backgroundColor: 'rgb(255, 147, 34)',
    borderRadius: 10
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
});

export default PriceInputModal;
