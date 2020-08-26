import { isProductInfoStale } from '../reducers/selectors.js';

export const DELETE_SUGGESTIONS = 'DELETE_SUGGESTIONS';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const CHANGE_PRICE_RANGE = 'CHANGE_PRICE_RANGE';
export const CHANGE_SORT_BY = 'CHANGE_SORT_BY';
export const DELETE_SUCCESS_MESSAGE = 'DELETE_SUCCESS_MESSAGE';


export const FETCH_PRODUCT = 'FETCH_PRODUCT';

export const fetchProduct = (id) => ({
  api: {
    endpoint: `/product/${id}`,
    type: FETCH_PRODUCT,
    payload: {
      success: (state, res) => {
        return {
          data: res.data,
          updated_at: Date.now(),
        }
      }
    },
    cancelRequest: (state) => {
      return !isProductInfoStale(state, id, 120);
    }
  }
})

export const FETCH_CATEGORY = 'FETCH_CATEGORY';

export const fetchCategory = (category) => ({
  api: {
    endpoint: `/products/${category}`,
    type: FETCH_CATEGORY,
    payload: {
      pending: { category },
      success: (state, res) => {
        return {
          data: res.data,
          updated_at: Date.now(),
          category
        }
      }
    },
  }
})

export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';

export const fetchCategories = () => ({
  api: {
    endpoint: `/categories`,
    type: FETCH_CATEGORIES,
  }
})

export const FETCH_PROMOTED = 'FETCH_PROMOTED';

export const fetchPromotedItems = () => ({
  api: {
    endpoint: `/frontpage`,
    type: FETCH_PROMOTED,
  }
})

export const FETCH_SUGGESTIONS = 'FETCH_SUGGESTIONS';

export const fetchSuggestions = (data) => ({
  api: {
    endpoint: `/autocomplete`,
    method: "GET",
    type: FETCH_SUGGESTIONS,
    data
  }
})


export const deleteSuggestions = () => ({
  type: DELETE_SUGGESTIONS,
})

export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  payload: { category }
})

export const setPriceRange = (min, max) => ({
  type: CHANGE_PRICE_RANGE,
  min,
  max
})

export const setSortBy = (keyword) => ({
  type: CHANGE_SORT_BY,
  sortBy: keyword
})


