import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { resetErrors, setErrors } from "../actions"
import { getRequestInfo } from "../reducers/selectors";


export default function useApiStatus(apiType, clearStatusOnUnmount = true) {
  const dispatch = useDispatch();

/* 
dispatches an action when the component unmounts
to clear apiStatus in redux store
*/
  useEffect(() => {
    if(clearStatusOnUnmount) {
    return () => dispatch(resetErrors(apiType));
    }
  }, [apiType, clearStatusOnUnmount, dispatch]);

  const status = useSelector((state) => getRequestInfo(state,apiType));
  //set Errors for Clientside Validation
  const setError = (message) => dispatch(setErrors(apiType,message));
  const resetError = () => dispatch(resetErrors(apiType));

  return {...status, setError, resetError};

}