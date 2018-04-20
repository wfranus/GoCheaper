import { Navigation } from 'react-native-navigation';

import ScannerScreen from './ScannerScreen';
import BarCodeInfoScreen from './BarCodeInfoScreen';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('GoCheaper.ScannerScreen', () => ScannerScreen);
  Navigation.registerComponent('GoCheaper.BarCodeInfoScreen', () => BarCodeInfoScreen);
}
