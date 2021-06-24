import messages from "./globalMessages";

export const CREATE_ADDRESS = "CREATE_ADDRESS";

export const addAddress = (data, onSuccess) => ({
  api: {
    endpoint: `/myaccount/addresses`,
    method: "POST",
    type: CREATE_ADDRESS,
    data,
    successMessage: messages.addressAdd,
    onSuccess: onSuccess,
  },
});

export const FETCH_ADDRESS = "FETCH_ADDRESS";

export const fetchAddresses = () => ({
  api: {
    endpoint: `/myaccount/addresses`,
    method: "GET",
    type: FETCH_ADDRESS,
  },
});

export const DELETE_ADDRESS = "DELETE_ADDRESS";

export const deleteAddress = (id) => ({
  api: {
    endpoint: `/myaccount/addresses/${id}`,
    method: "DELETE",
    type: DELETE_ADDRESS,
    successMessage: messages.addressDelete,
  },
});
