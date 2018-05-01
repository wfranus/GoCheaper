import { TabNavigator, StackNavigator, HeaderBackButton } from 'react-navigation';

import ScannerScreen from '../components/ScannerScreen';
import BarCodeInfoScreen from '../components/BarCodeInfoScreen';
import {turnOnCamera} from '../actions/cameraActions';

function goBackToScannerScreen(navigation) {
  console.log("BACK!");
  dispatch(turnOnCamera());
  navigation.goBack(null);
}

const navigationOptions = ({ navigation }) => ({
    headerLeft: <HeaderBackButton onPress={() => goBackToScannerScreen(navigation)} />,
})

const NavigationStack = StackNavigator(
  {
    Scanner: { screen: ScannerScreen },
    BarCodeInfo: { screen: BarCodeInfoScreen, navigationOptions: {navigationOptions} },
  }
);

export default NavigationStack;
