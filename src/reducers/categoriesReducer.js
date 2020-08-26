import { FETCH_CATEGORIES } from '../actions';

const initialState = {
  categories: [],
}

const categories = (state = initialState, action) => {

  switch (action.type) {
    case `SUCCESS_${FETCH_CATEGORIES}`:
      const categories = action.payload.reduce((obj, category) => {
        obj[category.slug] = category;
        return obj
      }, {})
      return { ...state, categories }
    default:
      return state;
  }
}

export default categories;