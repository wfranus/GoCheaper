import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Icon, Button, Input, } from 'react-native-elements'
//import { TextInputMask } from 'react-native-masked-text'

class PriceInputModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: "",
      isPriceCorrect: false
    }

    this.onPriceSumbit = this.onPriceSumbit.bind(this);
  }

  onTextChanged(text) {
    // code to remove non-numeric characters from text
    // change comma to dot symbol
    let newText = '';
    let hasDelimeter = false;
    let maxLength = 9;

    for (var i=0; i < text.length && i < maxLength; i++) {
        if ('0123456789'.indexOf(text[i]) > -1 ) {
          newText += + text[i];
        } else if (!hasDelimeter && '.,'.indexOf(text[i] > -1)) {
          newText += '.';
          hasDelimeter = true;
          maxLength = i + 3; // allow 2 decimal digits
        }
        else { break;}
    }


    this.setState({
      price: newText,
      isPriceCorrect: newText.length > 0 ? true : false
    });
  }

  onPriceSumbit() {
    // below code works with TextInputMask
    // let priceFloat = this.refs['priceText'].getRawValue();

    let priceFloat = parseFloat(this.state.price);

    if (!isNaN(priceFloat) && priceFloat > 0.0) {
      this.props.onSubmit(priceFloat);
    } else { return; }
  }

  /** other versions of input **/

  // <TextInput
  //   style={styles.priceInput}
  //   autoFocus={true}
  //   keyboardType = 'numeric'
  //   onChangeText = {(text)=> this.onTextChanged(text)}
  //   value = {this.state.value}
  // />

  // <TextInputMask
  //   ref={'priceText'}
  //   type={'money'}
  //   style={styles.priceInput}
  //   options={{
  //     unit: "",
  //     delimeter: "",
  //     //suffixUnit: "zł",
  //     zeroCents: false
  //   }}
  // />
  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder='Twoja cena (zł)'
          autoFocus={true}
          inputStyle={styles.priceInput}
          keyboardType='numeric'
          onChangeText={(text) => this.onTextChanged(text)}
          value={this.state.price}
        />
        <Button
          containerViewStyle={styles.buttonContainer}
          buttonStyle={styles.buttonSearch}
          textStyle={styles.buttonText}
          disabled={!this.state.isPriceCorrect}
          onPress={() => this.onPriceSumbit()}
          icon={{name: 'whatshot', size:25}}
          title='Sprawdź czy oszczędzisz' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
