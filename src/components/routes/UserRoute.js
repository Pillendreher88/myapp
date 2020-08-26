import React, { useEffect } from "react";
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserProfile, FETCH_USER_PROFILE } from "../../actions/profile";
import useApiStatus from "../../hooks/useApiStatus";

const Auth = ({children, getUser, authenticated}) => {

  const { status, isLoading } = useApiStatus(FETCH_USER_PROFILE);
  useEffect(() => {
    getUser();
  }, []);

  return (status || !isLoading ) ? (authenticated ? children : <Redirect to={{ pathname: "/login" }}/>)  : null
}

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(getUserProfile()),
})

const AuthRequest = connect(mapStateToProps, mapDispatchToProps)(Auth);

const PrivateRoute = ({ component: Component, ...rest }) => {

  return <Route
    {...rest}
    render={() => 
      <AuthRequest>
        <Component/>
      </AuthRequest>   
    }
  />
};

export default PrivateRoute;