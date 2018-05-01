import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
//import { addNavigationHelpers } from "react-navigation";
import { addListener } from '../utils/redux';
import NavigationStack from "./navigationStack";

class AppNavigation extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
  };

  render() {
    const { dispatch, nav } = this.props;
    return (
      <NavigationStack
        // navigation={addNavigationHelpers({ dispatch, state: nav })}
        navigation={{
          dispatch,
          state: nav,
          addListener,
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppNavigation);
