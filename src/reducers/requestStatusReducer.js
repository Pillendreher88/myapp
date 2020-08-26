

const initialState = {}

const MESSAGES_SUCCESS = {
  UPDATE_PROFILE: "Name was successfully changed.",
  SUBMIT_REVIEW: "Review successfully created.",
}

export default (state = initialState, { type, payload, ...rest }) => {

  if (type === "RESET_ERRORS") {
    const { key } = rest;
    return { ...state, [key]: { isLoading: false, error: [] } };
  }

  else if (type === "RESET_SUCCESS") {
    const { key } = rest;
    return { ...state, [key]: { isLoading: false, successMessage: [] } };
  }
  else if (type === "SET_ERRORS") {
    const { key, message } = rest;
    return { ...state, [key]: { ...state[key], message, status: "ERROR" } };
  }

  const reg = new RegExp("PENDING|SUCCESS|ERROR");
  const match = reg.exec(type);

  if (!match) return state;

  const split = type.split(/_(.+)/);
  const requestStatus = split[0];
  const requestName = split[1];
 
  switch (requestStatus) {
    case "PENDING":
      return { ...state, [requestName]: { isLoading: true, status: requestStatus } };
    case "SUCCESS":
      return { ...state, [requestName]: { isLoading: false, status: requestStatus , message: MESSAGES_SUCCESS[requestName] } };
    case "ERROR":
      let message = "Something went wrong";
      let errors = null;
      if (payload.status === 422) {
        errors = payload.data.errors;
        message = payload.data.errors;
      }
      else if (payload.status === 401) {
        message =  payload.data ;
      }
      return { ...state, [requestName]: { isLoading: false, error: payload.data, status: requestStatus, errors, message }};
    default:
      return state;
  }
}
