import {
  LOGIN,
  REGISTER,
  LOGOUT,
  UPDATE_PROFILE,
  UPLOAD_AVATAR,
  FETCH_USER_PROFILE,
  UNAUTHORIZED,
  CREATE_PAYMENT,
} from "../actions";

const initialState = {
  authenticated: false,
  appLoaded: false,
  user: {},
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case "APP_LOADED":
      return { ...state, appLoaded: true };
    case `SUCCESS_${REGISTER}`:
    case `SUCCESS_${FETCH_USER_PROFILE}`:
    case `SUCCESS_${LOGIN}`:
      return { ...state, authenticated: true, user: payload };
    case UNAUTHORIZED:
    case `SUCCESS_${LOGOUT}`:
      return { ...state, authenticated: false, user: {} };
    case `SUCCESS_${UPDATE_PROFILE}`:
      return { ...state, user: { ...state.user, ...payload.data } };
    case `SUCCESS_${UPLOAD_AVATAR}`:
      return { ...state, user: { ...state.user, avatar: payload.imageUrl } };
    case `SUCCESS_${CREATE_PAYMENT}`:
      return { ...state, stripeSecret: payload.clientSecret };
    default:
      return state;
  }
};
