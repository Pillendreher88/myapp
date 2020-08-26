import React, {useRef, useEffect} from "react";
import {
  Route,
  Redirect,
  useLocation
} from 'react-router-dom';
import {connect} from 'react-redux';

const GuestRoute = ({ component: Component, authenticated, ...rest }) => {

  let location = useLocation();
  const prevPath = useRef(location);

  useEffect(() => {
    if(rest.path !== location.pathname)
    prevPath.current = location;
  }, [location, rest.path]);

  const redirectTo = location.state && location.state.redirectTo ? 
                     {pathname: location.state.redirectTo, state:  location.state} : 
                     prevPath.current;

  return <Route
   {...rest}
   render={props =>
   !authenticated
    ? <Component {...props} />
    : <Redirect to={redirectTo} />}
  />
   };

 const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
};

export default connect(mapStateToProps)(GuestRoute);