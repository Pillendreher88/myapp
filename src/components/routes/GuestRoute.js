import React from "react";
import {
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
import { connect } from 'react-redux';

const GuestRoute = ({ component: Component, authenticated, prevPath, ...rest }) => {

  let location = useLocation();

  const redirectTo = location.state && location.state.redirectTo ?
    { pathname: location.state.redirectTo, state: location.state } :
    prevPath.current;

  return <Route
    {...rest}
    render={props =>
      !authenticated
        ? <Component {...props} />
        : <Redirect to={redirectTo === "/login" ? "/myaccount/myprofile" : redirectTo} />}
  />
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
};

export default connect(mapStateToProps)(GuestRoute);