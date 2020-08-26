
import messages from "./globalMessages";

export const CREATE_ADDRESS = 'CREATE_ADDRESS';

export const addAddress = (data, history) => ({
  api: {
    endpoint: `/addresses`,
    method: "POST",
    type: CREATE_ADDRESS,
    data,
    successMessage: messages.addressAdd,
    onSuccess: () => history.push("/myaccount/myaddresses"),
  }
})

export const FETCH_ADDRESS = 'FETCH_ADDRESS';

export const fetchAddresses = () => ({
  api: {
    endpoint: `/addresses`,
    method: "GET",
    type: FETCH_ADDRESS,
  }
})

export const DELETE_ADDRESS = 'DELETE_ADDRESS';

export const deleteAddress = (id) => ({
  api: {
    endpoint: `/addresses/${id}`,
    method: "DELETE",
    type: DELETE_ADDRESS,
    successMessage: messages.addressDelete,
  }
})
