export const DECREASE_QTY = "DECREASE_QTY";
export const ADD_CART_ITEM = "ADD_CART_ITEM";
export const DELETE_CART_ITEM = "DELETE_CART_ITEM";
export const CLOSE_PREVIEW = "CLOSE_PREVIEW";
export const CHANGE_ADDRESS = "CHANGE_ADDRESS";
export const CHANGE_DELIVERY = "CHANGE_DELIVERY";
export const EMPTY_CART = "EMPTY_CART";
export const CREATE_PAYMENT = "CREATE_PAYMENT";

export const addItem = (id, openPreview = false) => ({
  type: ADD_CART_ITEM,
  id,
  open: openPreview,
});

export const deleteItem = (id) => ({
  type: DELETE_CART_ITEM,
  id,
});

export const emptyCart = (id) => ({
  type: EMPTY_CART,
  id,
});

export const decreaseQty = (id) => ({
  type: DECREASE_QTY,
  id,
});

export const closePreview = () => ({
  type: CLOSE_PREVIEW,
});

export const changeDelivery = (delivery) => ({
  type: CHANGE_DELIVERY,
  delivery,
});

export const changeAddress = (id) => ({
  type: CHANGE_ADDRESS,
  id,
});

export const createPaymentIntent = (data) => ({
  api: {
    endpoint: `/payments`,
    type: CREATE_PAYMENT,
    method: "POST",
    data,
  },
});
