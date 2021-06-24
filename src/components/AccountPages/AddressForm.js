import React from "react";
import StatusMessage from "../StatusMessage.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Formik, Form } from "formik";
import styled from "styled-components";
import TextFieldUnstyled from "../Utils/FormTextField.js";
import Button from "@material-ui/core/Button";
import useApiStatus from "../../hooks/useApiStatus.js";
import useSetFormikFieldErrors from "../../hooks/useSetFormikFieldErrors.js";
import { CREATE_ADDRESS } from "../../actions/index.js";

const LoadingButton = styled(Button)`

&.Mui-disabled {
  background-color:  ${(props) => (props.isSuccess ? "green" : null)}
  color: ${(props) => (props.isSuccess ? "#fff" : null)}
}
`;

const TextField = styled(TextFieldUnstyled)`
  margin-top: 8px;
  margin-bottom: 8px;
`;

export default function AddressForm({ address, onSubmit }) {
  const { status, isLoading, errors } = useApiStatus(CREATE_ADDRESS);
  const formikRef = useSetFormikFieldErrors(errors);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.password = "Enter your name";
    }
    if (!values.street) {
      errors.password = "Enter your street";
    }
    if (!values.city) {
      errors.password = "Enter your city";
    }
    if (!values.zip) {
      errors.password = "Enter your zip";
    }
  };
  return (
    <Formik
      initialValues={
        address ? address : { name: "", street: "", city: "", zip: "" }
      }
      onSubmit={onSubmit}
      validate={validate}
      innerRef={formikRef}
    >
      {() => (
        <Form>
          <StatusMessage apiKey={CREATE_ADDRESS} />
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            name="street"
            label="Street + Number"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            name="city"
            label="City"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            name="zip"
            label="Zip"
            variant="outlined"
            fullWidth
            required
          />
          <LoadingButton
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
            disabled={isLoading}
            isSuccess={status && status.success}
          >
            {isLoading && <CircularProgress size={24} color="secondary" />}
            {address ? "Edit Address" : "Add a new Address"}
          </LoadingButton>
        </Form>
      )}
    </Formik>
  );
}
