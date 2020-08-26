
export const DELETE_GLOBAL_MESSAGE = "DELETE_GLOBAL_MESSAGE";
export const CREATE_GLOBAL_MESSAGE = "CREATE_GLOBAL_MESSAGE";


export const createGlobalMessage = (message, severity) => ({
  type: CREATE_GLOBAL_MESSAGE,
  message,
  severity,
})

export const deleteGlobalMessage = () => ({
  type: DELETE_GLOBAL_MESSAGE,
})

const successMessages = {

  login: 'You are now logged in',
  logout: 'Logout was successul',
  addressAdd: 'Address added',
  addressDelete: 'Address deleted',
  avatarUpload: 'Avatar successfully changed',

}

export const errorMessages = {

}

export default successMessages;
