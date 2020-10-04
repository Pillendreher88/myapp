
export const FETCH_REVIEWS = 'FETCH_REVIEWS';

export const fetchReviews = (id, query) => ({
  api: {
    endpoint: query ? `/shop/product/${id}/reviews${query}` : `/shop/product/${id}/reviews`,
    type: FETCH_REVIEWS,
  }
})

export const FETCH_REVIEW_STATS = 'FETCH_REVIEW_STATS';

export const fetchReviewStats = (id) => ({
  api: {
    endpoint: `/shop/product/${id}/reviews?overview=1`,
    type: FETCH_REVIEW_STATS,
  }
})

export const FETCH_USER_REVIEWS = 'FETCH_USER_REVIEWS';

export const fetchUserReviews = (productId) => ({
  api: {
    endpoint:  `/shop/current-user/reviews?product=${productId}`,
    type: FETCH_USER_REVIEWS,
    cancelRequest: (state) => {
      return !state.auth.authenticated;
    }
  }
})

export const SUBMIT_REVIEW = 'SUBMIT_REVIEW';

export const editReview = (id, data) => ({
  api: {
    endpoint: `/shop/reviews/${id}`,
    type: SUBMIT_REVIEW,
    method: "PUT",
    data
  }
})

export const createReview = (productId, data) => ({
  api: {
    endpoint: `/shop/product/${productId}/reviews`,
    type:  SUBMIT_REVIEW,
    method: "POST",
    data
  }
})

export const LOAD_MORE_REVIEWS = 'LOAD_MORE_REVIEWS';

export const loadMoreReviews = (url) => ({
  api: {
    endpoint: url,
    type: LOAD_MORE_REVIEWS,
  }
})

export const VOTE_HELPFUL = 'VOTE_HELPFUL';

export const postHelpful = (id, isHelpful) => ({
  api: {
    endpoint: `shop/reviews/${id}/helpful`,
    data: { isHelpful },
    method: "POST",
    type: VOTE_HELPFUL,
  }
})
