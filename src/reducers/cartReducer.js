import { DECREASE_QTY, ADD_CART_ITEM, DELETE_CART_ITEM, CLOSE_PREVIEW, CHANGE_ADDRESS, CHANGE_DELIVERY } from '../actions';
import { combineReducers } from 'redux';

const initialCart = [];
const initialPreview = { open: false, recentlyAdded: -1 }

export const getNumberInCart = cart => {
  return (cart.cart.length !== 0) ? cart.cart.reduce((sum, item) =>
    item.quantity + sum, 0
  ) : 0
};

export const getQuantity = cart =>

  (cart.length !== 0) ? cart.reduce((sum, item) =>
    item.quantity + sum, 0
  ) : 0;


const preview = (preview = initialPreview, action) => {
  switch (action.type) {

    case ADD_CART_ITEM:
      return { open: action.open ? true : preview.open, recentlyAdded: action.id };
    case CLOSE_PREVIEW:
      return initialPreview;
    default:
      return preview;
  }
}

const deliveryAddress = (address = 0, action) => {
  switch (action.type) {
    case CHANGE_ADDRESS:
      return  action.id 
    default:
      return address;
  }
}

const delivery = (delivery = "standard", action) => {
  switch (action.type) {
    case CHANGE_DELIVERY:
      return  action.delivery
    default:
      return delivery;
  }
}

const cart = (cart = initialCart, action) => {
  switch (action.type) {

    case DECREASE_QTY:
      return cart.map(item =>
        (item.id === action.id) ?
          { ...item, quantity: item.quantity - 1 }
          : item);

    case ADD_CART_ITEM:
      const existingCartItem = cart.find(item => item.id === action.id);
      if (existingCartItem) {
        return cart.map(item =>
          (item.id === action.id) ?
            { ...item, quantity: item.quantity + 1 }
            : item);
      }
      return [{ id: action.id, quantity: 1 }].concat(cart);
    case DELETE_CART_ITEM:
      return cart.filter(item => item.id !== action.id);
    default:
      return cart;
  }
}
export default combineReducers({
  cart,
  preview,
  delivery,
  deliveryAddress
}); 