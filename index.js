import { AppRegistry } from 'react-native';
import App from './src/App';


/***************************************************************/
/* Code below prevents app from crash when Remote Debug is off */
/***************************************************************/

// symbol polyfills
global.Symbol = require('core-js/es6/symbol');
require('core-js/fn/symbol/iterator');

// collection fn polyfills
require('core-js/fn/map');
require('core-js/fn/set');
require('core-js/fn/array/find');

/**************************************************************/


AppRegistry.registerComponent('GoCheaper', () => App);
