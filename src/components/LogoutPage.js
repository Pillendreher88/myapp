import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { logout } from '../actions';

function LogoutPage() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout())
  }, [dispatch]);

  return <Redirect to="/home" />

};

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
};

export default connect(mapStateToProps)(LogoutPage);


