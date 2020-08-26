import { createSelector } from 'reselect';

const categorySelector = state => state.products.byCategory.selected;
const productsSelector = state => state.products;
const querySelector = (state, props) => props.query;


export const getProductInfo = (state, id) => {
  if (!state.products.byId) return null;
  return state.products.byId[id];
}

export const getLoadingInfo = (state, requestName) => {
  if (!state.requestStatus || !state.requestStatus[requestName]) return false;
  return state.requestStatus[requestName].isLoading;
}
export const getRequestInfo = (state, requestName) => {
  if (!state.requestStatus || !state.requestStatus[requestName]) return {};
  return state.requestStatus[requestName];
}

export const getDeliveryAddress = (state) => {
  const id = state.cart.deliveryAddress;
  
  return id ? state.addresses[id] : getAddresses(state)[0];
}

export const getDelivery = (state) => {
  
  return state.cart.delivery ? state.cart.delivery : "standard";
}

export const getDeliveryPrice = (state) => {
  
  return  (getDelivery(state) === "express") ? 4 : 2;
}

export const getProductsPrice = state => {
  return state.cart.cart.reduce((sum, item) => {
    if (!state.products.byId || !state.products.byId[item.id])
      return sum;
    return item.quantity * state.products.byId[item.id].price + sum;
  }, 0);
}

export const getTotalPrice = (state) => {

  return getProductsPrice(state) + getDeliveryPrice(state);
}

export const getCartProducts = state => {
  return state.cart.cart.map(item => ({ ...state.products.byId[item.id], quantity: item.quantity }));
}


export const getError = (state, requestName) => {
  if (!state.requestStatus || !state.requestStatus[requestName]) return [];
  return state.requestStatus[requestName].error;
}

export const getReviews = (state, id) => {
  if (!state.reviews) return null;
  return state.reviews[id];
}

export const getUserReview = (state, id) => {
  if (!state.reviews || !state.reviews.currentUser) return null;
  return state.reviews.currentUser[id];
}

export const getAddresses = (state) => {
  if (!state.addresses) return [];
  return Object.values(state.addresses);
}

export const getReviewStats = (state) => {
  if (!state.reviews || !state.reviews.stats) return null;
  return state.reviews.stats;
}

export const getPaginationReviews = (state, id) => {
  if (!state.reviews) return null;
  return state.reviews.pagination;
}

export const isProductInfoStale = (state, id, duration) => {
  if (!state.products.byId || !state.products.byId[id] || Date.now() - state.products.byId[id].updated_at > duration * 1000) return true;
  else return false;
}

export const getProductsDiscount = (state) => {
  if (!state.products.byId) return null;
  return state.products.promoted.discounted;
}
export const getProductsNew = (state) => {
  if (!state.products.byId) return null;
  return state.products.promoted.recent;
}

export const getVisibleProducts = createSelector(
  [categorySelector,
    productsSelector,
    querySelector
  ],
  (category, products, query) => {
    if (!products.byCategory[category]) return [];
    const productsByCategetory = products.byCategory[category].products.map(id => products.byId[id]);

    const visibleProducts = filterProducts(productsByCategetory, query);
    return sortProducts(visibleProducts, query.sort, query.order);
  }

);

const filterProducts = (products, filter) => {
  const filteredProducts = products.filter(product => {
    for (let key in filter) {
      if (key === "priceMin" && Number(product.price) < filter[key]) {
        return false;
      }
      if (key === "priceMax" && Number(product.price) > filter[key]) {
        return false;
      }
      if (key === "discount" && product.discount === 0 && filter[key] === "true") {
        return false;
      }
    }
    return true;
  });

  return filteredProducts;
}

const sortProducts = (products, key, order) => {

  if (!key) return products;

  return products.sort((a, b) => (order === "asc" ? a[key] - b[key] : b[key] - a[key]));
}


