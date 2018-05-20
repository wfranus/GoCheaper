import { TabNavigator, StackNavigator, HeaderBackButton } from 'react-navigation';

import ScannerScreen from '../components/ScannerScreen';
import BarCodeInfoScreen from '../components/BarCodeInfoScreen';
import SavingsSummaryScreen from '../components/SavingsSummaryScreen';

const NavigationStack = StackNavigator(
  {
    Scanner: { screen: ScannerScreen },
    BarCodeInfo: { screen: BarCodeInfoScreen },
    SavingsSummary: { screen: SavingsSummaryScreen },
  },
  {
    navigationOptions: {
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
      headerLeft: ({goBack}) => <Icon name={'arrow-back'}
                        iconStyle={{marginLeft: 10}}
                        onPress={ () => {navigation.goBack(null);}}
                  />,
    },
  }
);

export default NavigationStack;
