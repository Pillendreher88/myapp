import React, { Suspense, useEffect } from "react";
import Navbar from "./components/Header/NavBarContainer.js";
import ProductList from "./components/Products/ProductList.js";
import ProductPage from "./components/Products/ProductPage.js";
import Cart from "./components/Cart/Cart.js";
import Container from '@material-ui/core/Container';
import CartPreview from "./components/Cart/CartPreview.js";
import Reviews from "./components/Reviews/Reviews.js";
import LoginRegisterPage from "./components/LoginRegister/LoginRegisterPage.js";
import ProtectedRoute from "./components/routes/UserRoute.js";
import GuestRoute from "./components/routes/GuestRoute.js";
import FrontPage from "./components/FrontPage.js";
import LogoutPage from "./components/LogoutPage.js";
import { loadState } from './localStorage.js';
import { getUserProfile, loadApp } from './actions';
import { connect } from 'react-redux';
import Account from './components/AccountPages';
import {useLocation, Route} from "react-router-dom";
import queryString from 'query-string';
import Checkout from "./components/Cart/Checkout.js";
import GlobalMessage from "./components/GlobalMessage.js";


const Shop = ({ appLoaded, loadApp, authenticated }) => {

  useEffect(() => {
    const token = loadState("jwt");
    loadApp(token);
    /*  if(token) {
       getUserProfile();
     } */
  }, [authenticated]);

  const { search } = useLocation();
  const query = queryString.parse(search);

  if (!appLoaded) return <div></div>;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <CartPreview />
        <Container maxWidth="lg" disableGutters>
          <GlobalMessage/>
          <Route path="/products/:category/:subCategory?"
            render={() => <Suspense fallback={<div>Loading...</div>}>
              <ProductList query={query} /></Suspense>} />
          <Route path="/product/:id" exact
            render={(routeProps) => <ProductPage {...routeProps} />} />
          <Route path="/product/:id/reviews"
            render={(routeProps) => <Reviews {...routeProps} />} />
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/logout">
            <LogoutPage />
          </Route>

          <ProtectedRoute path="/myaccount" component={Account} />
          <ProtectedRoute path="/checkout" component={Checkout} />

          <GuestRoute path="/login" component={LoginRegisterPage} />
          <Route path="/home">
            <FrontPage/>
          </Route>
        </Container>
      </Suspense>
    </>
  );
}

const mapDispatchToProps = dispatch => ({
  getUserProfile: () =>
    dispatch(getUserProfile()),
  loadApp: (token) =>
    dispatch(loadApp(token)),
});


const mapStateToProps = state => {
  return {
    appLoaded: state.auth.appLoaded,
    authenticated: state.auth.authenticated,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Shop);

