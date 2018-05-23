import AppNavigator from "../navigators/navigationStack";
import { createNavigationReducer } from 'react-navigation-redux-helpers';

const navigationReducer = createNavigationReducer(AppNavigator);

export default navigationReducer;
