import { FETCH_REVIEWS, FETCH_REVIEW_STATS, VOTE_HELPFUL, LOAD_MORE_REVIEWS, FETCH_USER_REVIEWS, SUBMIT_REVIEW } from '../actions';

const initialState = {
  stats: {}
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case `SUCCESS_${FETCH_REVIEW_STATS}`:
      return { ...state, stats: statsReducer(state.stats, { type, payload }) }
    case `SUCCESS_${VOTE_HELPFUL}`:
      const key = payload.shop_item_id;
      return {
        ...state, [key]: state[key].map(review => {
          if (review.id === payload.id) {
            return { ...review, isRatedHelpful: payload.isRatedHelpful, helpful: payload.helpful };
          }
          return review;
        })
      }
    case `SUCCESS_${FETCH_REVIEWS}`:
      if (typeof payload === "undefined" || payload.length === 0)
        return state;
      return {
        ...state, pagination: { next_page_url: payload.next_page_url },
        title:  payload.product_name,
        [payload.product_id]: payload.data
      }
    case `SUCCESS_${FETCH_USER_REVIEWS}`:
      if (typeof payload === "undefined" || payload.length === 0)
        return state;
      return {
        ...state, currentUser: payload.reduce((obj, review) => {
          obj[review.shop_item_id] = review;
          return obj
        }, {})
      }
    case `SUCCESS_${SUBMIT_REVIEW}`:
      return {
        ...state, currentUser: { ...state.currentUser, [payload.review.shop_item_id]: payload.review }
      }
    case `SUCCESS_${LOAD_MORE_REVIEWS}`:
      if (typeof payload === "undefined" || payload.length === 0)
        return state;
      return {
        ...state, pagination: { next_page_url: payload.next_page_url },
        [payload.product_id]: [...state[payload.data[0].shop_item_id], ...payload.data]
      }
    default:
      return state
  }
}

const statsReducer = (state, { type, payload }) => {
  switch (type) {
    case `SUCCESS_${FETCH_REVIEW_STATS}`:
      return { ...state, [payload.productId]: payload };
    default:
      return state
  }
}