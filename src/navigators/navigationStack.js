import { TabNavigator, StackNavigator, HeaderBackButton } from 'react-navigation';

import ScannerScreen from '../components/ScannerScreen';
import BarCodeInfoScreen from '../components/BarCodeInfoScreen';

const NavigationStack = StackNavigator(
  {
    BarCodeInfo: { screen: BarCodeInfoScreen },
    Scanner: { screen: ScannerScreen },
  }
);

export default NavigationStack;
