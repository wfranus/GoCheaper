import { combineReducers } from "redux";
import CameraReducer from "./CameraReducer";
import NavigationReducer from "./NavigationReducer";
import ProductReducer from "./ProductReducer";

const AppReducer = combineReducers({
  nav: NavigationReducer,
  camera: CameraReducer,
  product: ProductReducer
});

export default AppReducer;
