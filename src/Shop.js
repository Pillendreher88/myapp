import React, { Suspense, useEffect, useRef, lazy } from "react";
import ProductList from "./components/Products/ProductList.js";
import ProductPage from "./components/Products/ProductPage.js";
import Cart from "./components/Cart/Cart.js";
import Reviews from "./components/Reviews/Reviews.js";
import LoginRegisterPage from "./components/LoginRegister/LoginRegisterPage.js";
import ProtectedRoute from "./components/routes/UserRoute.js";
import GuestRoute from "./components/routes/GuestRoute.js";
import FrontPage from "./components/FrontPage.js";
import Layout from "./components/Layout.js";
import LogoutPage from "./components/LogoutPage.js";
import { loadState } from './localStorage.js';
import { getUserProfile, loadApp } from './actions';
import { connect } from 'react-redux';
import Account from './components/AccountPages';
import { useLocation, Route, Switch, Redirect } from "react-router-dom";
import queryString from 'query-string';
import Checkout from "./components/Cart/Checkout.js";
import Four0Four from "./components/Four0Four.js";

/* const ProductList = lazy(() => import("./components/Products/ProductList.js"));
const ProductPage = lazy(() => import("./components/Products/ProductPage.js"));
const LoginRegisterPage = lazy(() => import("./components/LoginRegister/LoginRegisterPage.js"));
const FrontPage = lazy(() => import("./components/FrontPage.js"));
const Account = lazy(() => import('./components/AccountPages'));
const Reviews = lazy(() => import("./components/Reviews/Reviews.js"));
 */
const Shop = ({ appLoaded, loadApp, authenticated }) => {

  
  const { search, pathname } = useLocation();
  const prevPath = useRef(pathname);
  const query = queryString.parse(search);

  useEffect(() => {
    const token = loadState("jwt");
    loadApp(token);
    /*  if(token) {
       getUserProfile();
     } */
  }, [authenticated]);

  useEffect(() => {
    if(pathname !== "/login") {
      prevPath.current = pathname;
    }
  }, [pathname]);


  if (!appLoaded) return <div></div>;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <FrontPage />
            </Route>
            <GuestRoute path="/login" component={LoginRegisterPage} prevPath = {prevPath}/>
            <Route path="/products/:category/:subCategory?"
              render={() => <ProductList query={query} />}/>
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
            <Route path="*">
              <Four0Four />
            </Route>
          </Switch>
        </Layout>
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

