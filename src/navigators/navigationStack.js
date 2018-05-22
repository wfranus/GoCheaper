import React from 'react'
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import ScannerScreen from '../components/ScannerScreen';
import BarCodeInfoScreen from '../components/BarCodeInfoScreen';
import SavingsSummaryScreen from '../components/SavingsSummaryScreen';
import SettingsScreen from '../components/SettingsScreen';
import SettingsSelectScreen from '../components/SettingsSelectScreen';

const NavigationStack = createStackNavigator(
  {
    Scanner: { screen: ScannerScreen },
    BarCodeInfo: { screen: BarCodeInfoScreen },
    SavingsSummary: { screen: SavingsSummaryScreen },
    Settings: { screen: SettingsScreen },
    SettingsSelect: { screen: SettingsSelectScreen},
  },
  {
    navigationOptions: ({ navigate, navigation }) => ({
      title: "GoCheaper",
      headerStyle: {
        backgroundColor: 'white'
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        flex:1,
        fontSize: 30,
        fontWeight: '200',
        fontFamily: 'AutobusBold',
        textAlign: 'center'
      },
      labelStyle: {
        fontWeight: "normal",
        fontFamily: "AutobusBold"
      },
      headerLeft: (
        <Icon name={'arrow-back'}
              iconStyle={{marginLeft: 10}}
              onPress={ () => {navigation.goBack(null);}}
        />
      ),
      headerRight: (
        <Icon name={'settings'}
              iconStyle={{marginRight: 10}}
              onPress={ () => { navigation.navigate('Settings') }}
        />
      ),
    }),
  }
);

export default NavigationStack;
