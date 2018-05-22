import { combineReducers } from "redux";
import CameraReducer from "./CameraReducer";
import NavigationReducer from "./NavigationReducer";
import ProductReducer from "./ProductReducer";
import SettingsReducer from "./SettingsReducer";

const AppReducer = combineReducers({
  nav: NavigationReducer,
  camera: CameraReducer,
  product: ProductReducer,
  settings: SettingsReducer,
});

export default AppReducer;
