import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';

import ScannerScreen from './ScannerScreen';
import BarCodeInfoScreen from './BarCodeInfoScreen';

export const Root = StackNavigator(
  {
    Scanner: { screen: ScannerScreen },
    BarCodeInfo: { screen: BarCodeInfoScreen },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
