import React, { Component } from 'react';
import { StyleSheet } from 'react-native';

import InputModal from './InputModal'

class ProductNameInputModal extends Component {
  constructor(props) {
    super(props);

    this.minNameLength = 4;
    this.maxNameLength = 80;

    this.onProductNameSubmit = this.onProductNameSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.isCorrect = this.isCorrect.bind(this);
  }

  validate(text) {
    let newText = '';
    let hasNonWhiteChar = false;

    for (let i=0; i < text.length && i < this.maxNameLength; i++) {
      if (!hasNonWhiteChar && text[i] === ' ') {
        continue;
      } else {
        newText += text[i];
        hasNonWhiteChar = true;
      }
    }

    return newText;
  }

  isCorrect(name) {
    return name.length >= this.minNameLength;
  }

  onProductNameSubmit(name) {
    if (name.length >= this.minNameLength) {
      this.props.onSubmit(name);
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
        validate={this.validate}
        isCorrect={this.isCorrect}
        onSubmit={this.onProductNameSubmit}
        placeholder="Nazwa produktu"
        initialValue={initialValue}
        inputStyle={styles.nameInput}
        keyboardType='default'
        multiline={true}
        maxLength={this.maxNameLength}
        selectTextOnFocus={true}
      />
    )
  }
}

const styles = StyleSheet.create({
  nameInput: {
    height: 120,
    width: 150,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default ProductNameInputModal;
