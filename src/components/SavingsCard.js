'use strict';
import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Platform
} from 'react-native';
import { Icon, Button, Badge, PricingCard } from 'react-native-elements';
import AnimateNumber from 'react-native-animate-number';

class SavingsCard extends Component {

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

  render() {
    let circleViewTransform = [
      {scaleX: this.state.scale},
      {scaleY: this.state.scale}
    ];
    const {
      color,
      buttonTitle,
      buttonDisabled,
      minPrice,
      onButtonPress,
      saveAmount
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          <Text
            style={[
              styles.shopName,
              {color},
            ]}
          >
            {this.props.shopName}
          </Text>
          <Text style={styles.message}>Taniej o:</Text>
          <View style={styles.circleViewWrapper}>
            <Animated.View
              style={[
                styles.circleViewWrapper,
                styles.circleView,
                {backgroundColor: color},
                {transform: circleViewTransform},
              ]}
            >
              <AnimateNumber
                style={styles.percent}
                value={this.state.savePercent}
                timing='easeOut'
                interval={1}
                formatter={(val) => {
                  return '' + parseInt(val) + ' %'
                }}
              />
            </Animated.View>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.details}>Najniższa cena:
              <Text style={{fontWeight: 'bold'}}> {minPrice} zł</Text>
            </Text>
            <Text style={styles.details}>Oszczędzisz:
              <Text style={{fontWeight: 'bold'}}> {saveAmount} zł</Text>
            </Text>
          </View>
          <Button
            containerViewStyle={styles.buttonContainer}
            buttonStyle={[
              styles.button,
              { backgroundColor: color },
            ]}
            disabled={buttonDisabled}
            textStyle={styles.buttonText}
            onPress={onButtonPress}
            icon={{name: 'shopping-basket', size:25, color: 'white'}}
            title={buttonTitle} />
        </View>
      </View>
    );
  }
}

export default SavingsCard;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    marginBottom: 15,
    backgroundColor: 'white',
    borderColor: '#cccaca',
    borderWidth: 1,
    padding: 25,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0,0,0, .2)',
        shadowOffset: { height: 1, width: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 0.5,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  wrapper: {
    backgroundColor: 'transparent',
    //alignItems: 'center'
  },
  shopName: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  message: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black'
  },
  circleViewWrapper: {
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 15,
    width: 110,
    height: 110,
  },
  circleView: {
    borderRadius: 110/2,
  },
  percent: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: 'white'
  },
  details: {
    fontSize: 20,
    color: 'black',
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
