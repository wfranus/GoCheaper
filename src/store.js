import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from "react-native";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import {middleware, addListener} from './utils/redux'
import AppReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['settings'],
}

const persistedReducer = persistReducer(persistConfig, AppReducer)

export default () => {
  let store = createStore(persistedReducer, applyMiddleware(middleware))
  let persistor = persistStore(store)
  return { store, persistor }
}
