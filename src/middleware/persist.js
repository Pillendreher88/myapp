import { saveState } from "../localStorage.js";
import { ACTIONS_PERSIST, REGISTER, LOGOUT, LOGIN } from "../actions";

const persist = (store) => (next) => (action) => {
  if (
    action.type === `SUCCESS_${REGISTER}` ||
    action.type === `SUCCESS_${LOGIN}`
  ) {
    const token = action.payload.access_token;
    if (token) {
      saveState("jwt", token);
    }
  } else if (
    action.type === `SUCCESS_${LOGOUT}` ||
    action.type === `UNAUTHORIZED`
  ) {
    saveState("jwt", "");
  }

  let result = next(action);

  if (ACTIONS_PERSIST.includes(action.type)) {
    saveState("cart", store.getState().cart.cart);
  }
  return result;
};

export default persist;
