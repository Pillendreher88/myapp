import { combineReducers } from 'redux'
import cartReducer from './cartReducer'
import productsReducer from './productsReducer'
import authReducer from './authReducer'
import categoriesReducer from './categoriesReducer'
import reviewsReducer from './reviewsReducer'
import requestStatusReducer from './requestStatusReducer'
import addressReducer from './addressReducer'
import globalMessageReducer from './globalMessageReducer'

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  auth: authReducer,
  reviews: reviewsReducer,
  categories: categoriesReducer,
  requestStatus: requestStatusReducer,
  addresses: addressReducer,
  globalMessages: globalMessageReducer,
});


export default rootReducer