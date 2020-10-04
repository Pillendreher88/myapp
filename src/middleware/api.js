import axios from 'axios';
import { loadState } from '../localStorage.js';
import { createApiTypes } from '../actions/createApiTypes.js';
import { createGlobalMessage } from '../actions/globalMessages.js';
import { unauthorized } from '../actions/index.js';

export const callApi = (endpoint, method, data) => {
  const token = loadState('jwt');
  axios.defaults.headers.common.Authorization = token ? `Bearer ${token}` : '';
  const url = (endpoint.indexOf("http") === -1) ?  process.env.REACT_APP_API_HOST  + endpoint : endpoint;
  switch (method) {
    case "GET": {
      return axios.get(url, {params: data});
    }
    case "POST": {
      return axios.post(url, data);
    }
    case "PUT": {
      return axios.put(url, data);
    }
    case "DELETE": {
      return axios.delete(url, data);
    }
    default: {
      return axios.get(url, data);
    }
  }
}

//creates payload from function
const createPayload = (payload, state, res) => {
  return typeof payload === 'function'
    ? payload(state, res)
    : payload;
}

const apiMiddleware = store => next => action => {

  const { api } = action;
  const { getState } = store;

  if (!api) {
    return next(action);
  }

  const { 
    endpoint,
    data, 
    type, 
    method, 
    cancelRequest, 
    onSuccess, 
    successMessage, 
    errorMessage,
    payload = {}} = action.api;

  //possible check if api request should be made based on state
  if (typeof cancelRequest === 'function' && cancelRequest(getState())) {
    return;
  }

  //validation of api properties
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }

  if (typeof type != 'string') {
    throw new Error('Need to specify a type for the api action.')
  }

  const [pendingType, successType, errorType] = createApiTypes(type);

  const pendingAction = { type: pendingType };
  const successAction = { type: successType, payload: (state, res) => res.data };
  const errorAction = { type: errorType, payload: (state, error) => error.response };

  if(payload.pending) {
    pendingAction.payload = payload.pending;
  }

  if(payload.success) {
    successAction.payload = payload.success; ;
  }

  if(payload.error) {
    errorAction.payload = payload.error;
  }

  next(pendingAction);
  const apiCall = callApi(endpoint, method, data);
  return apiCall.then(
    (res) => {
     
      next({ ...successAction, payload: createPayload(successAction.payload, getState(), res)});
      if(successMessage){
        next(createGlobalMessage(successMessage, "success"));
      }
      if(onSuccess) onSuccess();
  }, (error) => {
 
    console.log(error);
    if(error.response.status === 401 && type !== "LOGIN") {
      next(unauthorized());
      next(createGlobalMessage("You are not authorized.", "error"));
    }

    next({ ...errorAction, payload: createPayload(errorAction.payload, getState(), error)});
    if(errorMessage){
      next(createGlobalMessage(errorMessage, "error"));
    }
  });
}

export default apiMiddleware;