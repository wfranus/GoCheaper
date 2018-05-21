import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';
import InputModal from './InputModal'

class PriceInputModal extends Component {
  constructor(props) {
    super(props);

    this.maxPriceStrLength = 9;

    this.validate = this.validate.bind(this);
    this.onPriceSubmit = this.onPriceSubmit.bind(this);
  }

  validate(text) {
    // code to remove non-numeric characters from text
    // change comma to dot symbol
    let newText = '';
    let hasDelimeter = false;
    let maxLength = this.maxPriceStrLength

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

    return newText;
  }

  isCorrect(priceStr) {
    let priceFloat = parseFloat(priceStr);

    return priceStr.length > 0 && priceStr !== '.'
      && !isNaN(priceFloat) && priceFloat > 0.0;
  }

  onPriceSubmit(priceStr) {
    let priceFloat = parseFloat(priceStr);

    if (!isNaN(priceFloat) && priceFloat > 0.0) {
      this.props.onSubmit(priceFloat);
    } else { return; }
  }

  render() {
    const {
      isVisible,
      hideAction,
      initialValue
    } = this.props;

    return (
      <InputModal
        isVisible={isVisible}
        hideAction={hideAction}
        initialValue={initialValue}
        validate={this.validate}
        isCorrect={this.isCorrect}
        onSubmit={this.onPriceSubmit}
        inputStyle={styles.priceInput}
        maxLength={this.maxPriceStrLength}
        placeholder="Twoja cena (zł)"
        keyboardType='numeric'
      />
    )
  }
}

const styles = StyleSheet.create({
  priceInput: {
    height: 60,
    width: 150,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default PriceInputModal;
