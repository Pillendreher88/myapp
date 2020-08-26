import { FETCH_CATEGORY, SELECT_CATEGORY, FETCH_PRODUCT, FETCH_PROMOTED, FETCH_SUGGESTIONS, DELETE_SUGGESTIONS } from '../actions';
import { combineReducers } from 'redux';

const initialProducts = { updated_at: false, products: [] };

const byId = (state = {}, action) => {
  switch (action.type) {
    case `SUCCESS_${FETCH_CATEGORY}`:
      return {
        ...state,
        ...action.payload.data.reduce((obj, product) => {
          product.updated_at = action.payload.updated_at
          obj[product.id] = product
          return obj
        }, {})
      }
    case `SUCCESS_${FETCH_PRODUCT}`:
      return {
        ...state,
        [action.payload.data.id]: action.payload.data,
      }
    default:
      return state;
  }
}

const promoted = (state = { discounted: [], recent: [] }, action) => {

  switch (action.type) {

    case `SUCCESS_${FETCH_PROMOTED}`:
      const { discounted, recent } = action.payload;
      return { ...state, discounted, recent }
    default:
      return state;
  }
}

const suggestions = (state = [], action) => {

  switch (action.type) {

    case `SUCCESS_${FETCH_SUGGESTIONS}`:
      return action.payload;
    case DELETE_SUGGESTIONS:
      return [];
    default:
      return state;
  }
}

const categoryReducer = (state = initialProducts, action) => {
  switch (action.type) {
    case `SUCCESS_${FETCH_CATEGORY}`:
      return {
        ...state,
        products: action.payload.data.map(product => product.id),
        updated_at: action.updated_at,
      }
    default:
      return state;
  }
}

const byCategory = (state = {}, action) => {

  const { category } = action.payload ? action.payload : {};

  switch (action.type) {
    case `PENDING_${FETCH_CATEGORY}`:
      return { ...state, selected: category };
    case SELECT_CATEGORY:
      return { ...state, selected: category };
    case `SUCCESS_${FETCH_CATEGORY}`:
      return { ...state, [category]: categoryReducer(state[category], action) }
    default:
      return state;
  }
}

export default combineReducers({
  byId,
  byCategory,
  promoted,
  suggestions
});