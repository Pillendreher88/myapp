import React from 'react';
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";
import Header from "./Header.js";
import AddressesPage from "./AddressesPage.js";
import AddressForm from "./AddressForm.js";
import MyProfilePage from "./MyProfilePage.js";
import IndexPage from './IndexPage.js';

export default function Index() {

  let { path } = useRouteMatch();

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path={`${path}/`}>
          <IndexPage />
        </Route>
        <Route exact path={`${path}/myaddresses`}>
          <AddressesPage />
        </Route>
        <Route exact path={`${path}/myaddresses/add`}>
          <AddressForm />
        </Route>
        <Route path={`${path}/myaddresses/edit`} component={AddressForm} />
        <Route path={`${path}/myprofile`}>
          <MyProfilePage />
        </Route>
      </Switch>
    </div>
  )
}
