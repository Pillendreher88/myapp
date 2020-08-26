import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { loadState } from './localStorage.js';
import persist from './middleware/persist.js';
import logger from './middleware/logger.js';
import { composeWithDevTools } from 'redux-devtools-extension';
import api from './middleware/api.js';

let middleware = [api, thunk, persist, logger];

export default function configureStore() {

  const localStorageState = { cart: { cart: loadState("cart") } };
  const store = createStore(rootReducer, localStorageState, composeWithDevTools(applyMiddleware(...middleware)));

  return store;
}


