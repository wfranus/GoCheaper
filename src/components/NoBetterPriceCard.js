'use strict';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from 'react-native';
import { Icon, Button, Card } from 'react-native-elements';
import Confetti from 'react-native-confetti';
import colors from './config/colors';

class NoBetterPriceCard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      animated: this.props.animated,
      animationCompleted: false,
      scale: new Animated.Value(0.1),
      savePercent: this.props.savePercent,
    }
  }

  componentDidMount() {
    if (this.state.animated) {
      this.animateOnEntry();
    }
  }

  animateOnEntry() {
    Animated.timing(
      this.state.scale,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear
      }
    ).start(() => {
      this.setState({
        animationCompleted: true
      });
    });
  }

  componentWillUnmount () {
    if (this._confettiView) {
      this._confettiView.stopConfetti();
    }
  }

  throwConfetti() {
    if (this._confettiView) {
      console.log("Let's celebrate!");
      this._confettiView.startConfetti();
    }
  }

  render() {
    let circleViewTransform = [
      {scaleX: this.state.scale},
      {scaleY: this.state.scale}
    ];
    const {
      color,
      buttonTitle,
      minPrice,
      onButtonPress,
      shopName
    } = this.props;

    return (
      <Card title="Sprawdziliśmy ceny on-line...">
        <Confetti
          ref={(node) => this._confettiView = node}
          size={15}
          bsize={4}
          duration={4000}
          timeout={5}
        />
        <Text>i nie znaleźliśmy niższej ceny dla tego produktu.</Text>
        <View style={styles.circleView}>
          <Icon
            name='thumbsup'
            type='octicon'
            size={90}
            color={colors.green}
            onPress={() => this.throwConfetti()}/>
        </View>
        <Text style={styles.details}>
          Najniższa cena w <Text style={{color:color}}>{shopName}</Text>
          :  {minPrice} zł<
        /Text>
        <Button
          containerViewStyle={styles.buttonContainer}
          buttonStyle={[
            styles.button,
            { backgroundColor: color },
          ]}
          textStyle={styles.buttonText}
          onPress={onButtonPress}
          icon={{name: 'shopping-basket', size:25, color: 'white'}}
          title={buttonTitle} />
      </Card>
    );
  }
}

export default NoBetterPriceCard;

const styles = StyleSheet.create({
  details: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'black',
  },
  circleView: {
    height: 150,
    width: 150,
    margin: 15,
    backgroundColor: 'transparent',
    borderWidth: 6,
    borderRadius: 150/2,
    borderColor:  colors.green,
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  buttonContainer: {
    borderRadius: 2,
    padding: 100
  },
  button: {
    borderRadius: 2,
    marginTop: 15,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
});
