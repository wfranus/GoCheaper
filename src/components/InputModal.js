import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Modal from "react-native-modal";
import colors from './config/colors';

class InputModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      val: this.props.initialValue ? this.props.initialValue : "",
      isCorrect: false
    }
  }

  onFocus() {
    this.setState({
      isCorrect: this.props.isCorrect(this.state.val)
    });
  }

  onTextChanged(text) {
    let newText = this.props.validate(text);

    this.setState({
      val: newText,
      isCorrect: this.props.isCorrect(newText)
    });
  }

  render() {
    const {
      isVisible,
      hideAction,
      onSubmit,
      placeholder,
      inputStyle,
      keyboardType,
      // multiline,
      // maxLength,
      ...atributes
    } = this.props;

    const buttonIconColor = this.state.isCorrect
      ? 'black' : colors.ligthGrey;

    return (
      <Modal
        isVisible={isVisible}
        animationIn="bounceIn"
        animationInTiming={600}
        animationOut="bounceOut"
        animationOutTiming={600}
        style={{justifyContent: 'space-around', alignItems: 'center'}}
        onBackButtonPress={hideAction}
        onBackdropPress={hideAction}
      >
        <View style={styles.container}>
          <Input
            {...atributes}
            placeholder={placeholder}
            autoFocus={true}
            inputStyle={inputStyle}
            keyboardType={keyboardType}
            onFocus={() => this.onFocus()}
            onChangeText={(text) => this.onTextChanged(text)}
            value={this.state.val}
          />
          <Button
            buttonStyle={styles.buttonOk}
            disabledStyle={styles.buttonDisabled}
            titleStyle={styles.buttonText}
            disabledTitleStyle={styles.buttonTextDisabled}
            disabled={!this.state.isCorrect}
            onPress={() => onSubmit(this.state.val)}
            icon={{name: 'done', size:25, color: buttonIconColor}}
            title='OK' />
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',//'rgb(211, 216, 254)',//'#FFFFFF',
    height: 300,
    width: 300,
    borderRadius: 10,
  },
  buttonContainer: {
    borderRadius: 10,
    //backgroundColor: 'yellow'
    //alignItems: 'center'
  },
  buttonOk: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 2,
    borderColor: 'black'
  },
  buttonDisabled: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingLeft: 5,
    paddingRight: 5,
    borderWidth: 2,
    borderColor: colors.ligthGrey
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'black'
  },
  buttonTextDisabled: {
    color: colors.ligthGrey
  },
});

export default InputModal;
