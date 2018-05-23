import React, { Component } from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import AppNavigation from './navigators/index';
import configureStore from './store';

const { persistor, store } = configureStore()

class App extends Component {
  state = {
    loading: true
  };

  render() {
    return(
      <Provider store={store}>
        <PersistGate
          loading={
            <Text>
              Booting...
            </Text>
          }
          persistor={persistor}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    )
  }
}

export default App;
