import messages from "./globalMessages";

export const LOGIN= 'LOGIN';

export const login = (credentials) => ({
  api: {
    endpoint: `/auth/login`,
    data: {...credentials},
    method: "POST",
    type:  LOGIN,
    successMessage: messages.login,
  }
})

export const REGISTER = 'REGISTER';

export const register = (credentials) => ({
  api: {
    endpoint: `/auth/register`,
    data: {...credentials},
    method: "POST",
    type:  REGISTER,
  }
})

export const LOGOUT = 'LOGOUT';

export const logout = () => ({
  api: {
    endpoint: `/auth/logout`,
    method: "POST",
    type: LOGOUT,
    successMessage: messages.logout,
  }
})

export const UNAUTHORIZED = 'UNAUTHORIZED';

export const unauthorized = (id) => ({
  type: UNAUTHORIZED,
})


