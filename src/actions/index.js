import {
  ADD_CART_ITEM,
  DECREASE_QTY,
  DELETE_CART_ITEM,
  EMPTY_CART,
} from "./cart";
import { fetchCategories } from "./products";
import { getUserProfile } from "./profile";

export * from "./addresses.js";
export * from "./authentication.js";
export * from "./cart.js";
export * from "./products.js";
export * from "./profile.js";
export * from "./reviews.js";

export const ACTIONS_PERSIST = [
  ADD_CART_ITEM,
  DECREASE_QTY,
  DELETE_CART_ITEM,
  EMPTY_CART,
];

export function loadApp(token) {
  return (dispatch, getState) => {
    let req = [dispatch(fetchCategories())];
    if (token) {
      req.push(dispatch(getUserProfile()));
    }
    return Promise.all(req).then(() => dispatch({ type: "APP_LOADED" }));
  };
}

export const resetErrors = (key) => ({
  type: "RESET_ERRORS",
  key,
});
export const setErrors = (key, message) => ({
  type: "SET_ERRORS",
  key,
  message,
});

export const resetSuccess = (key) => ({
  type: "RESET_SUCCESS",
  key,
});
