import {FETCH_ADDRESS, DELETE_ADDRESS} from '../actions';

const initialState = {
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case `SUCCESS_${DELETE_ADDRESS}`:
    case `SUCCESS_${FETCH_ADDRESS}`:
      return payload.addresses.reduce((obj, address) => {
        obj[address.id] = address;
        return obj },{});
    default:
      return state
  }
}