import { FETCH_ORDERS } from "../actions";

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case `SUCCESS_${FETCH_ORDERS}`:
      return payload;
    default:
      return state;
  }
};
