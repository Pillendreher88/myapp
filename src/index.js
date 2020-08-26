import React from "react";
import ReactDOM from "react-dom";
import Shop from "./Shop";
import { BrowserRouter as Router} from "react-router-dom";
import { Provider } from "react-redux";
import  configureStore  from "./store";
import { StylesProvider } from '@material-ui/core/styles';
import ScrollToTop from './components/Utils/ScrollToTop';
import 'fontsource-roboto';

const store = configureStore();

const App = (
  <Provider store={store}>
    <Router basename='/shop'>
    <StylesProvider injectFirst>
      <ScrollToTop/>
      <Shop/>
    </StylesProvider>
    </Router>
  </Provider>
);

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

ReactDOM.render(App, document.getElementById("react-app"));