import React from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import TextFieldUnstyled from '../Utils/FormTextField.js';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from "react-router-dom";
import StatusMessage from '../StatusMessage.js';
import { CREATE_ADDRESS, addAddress } from '../../actions/index.js';
import useApiStatus from '../../hooks/useApiStatus.js';
import useSetFormikFieldErrors from '../../hooks/useSetFormikFieldErrors.js';
import { connect } from 'react-redux';


const LoadingButton = styled(Button)`

&.Mui-disabled {
  background-color:  ${props => props.isSuccess ? "green" : null}
  color: ${props => props.isSuccess ? "#fff" : null}
}
`;

const TextField = styled(TextFieldUnstyled)
  `
margin-top: 8px;
margin-bottom: 8px;
`;

function AddressForm({
  addAddress,
  location = {},
}) {

  const address = location.state ? location.state.address : null;
  const history = useHistory();
  const { status, isLoading, errors } = useApiStatus(CREATE_ADDRESS);
  const formikRef = useSetFormikFieldErrors(errors);

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.password = 'Enter your name';
    }
    if (!values.street) {
      errors.password = 'Enter your street';
    }
    if (!values.city) {
      errors.password = 'Enter your city';
    }
    if (!values.zip) {
      errors.password = 'Enter your zip';
    }
  }


  const handleSubmit = (values) => {
    addAddress(values, history);
  }

  return (
    <Box maxWidth="600px" flexGrow="1" mx="auto">
      <Typography variant="h3" component="h1" >
        <Box mb={4} mt={2} textAlign="center">
          {address ? "Edit Address" : "Add a new Address"}
        </Box>
      </Typography>
      <StatusMessage apiKey={CREATE_ADDRESS} />
      <Formik
        initialValues={address ? address : { name: '', street: '', city: '', zip: '' }}
        onSubmit={handleSubmit}
        validate={validate}
        innerRef={formikRef}
      >
        {() =>
          <Form>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              required />
            <TextField
              name="street"
              label="Street + Number"
              variant="outlined"
              fullWidth
              required />
            <TextField
              name="city"
              label="City"
              variant="outlined"
              fullWidth
              required />
            <TextField
              name="zip"
              label="Zip"
              variant="outlined"
              fullWidth
              required />
            <LoadingButton
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              disabled={isLoading || (status === "SUCCESS")}
              isSuccess={(status && status.success)}
            >
              {isLoading && <CircularProgress size={24} color="secondary" />}
              {status === "SUCCESS" ? status.message : (address ? "Edit Address" : "Add a new Address")}
            </LoadingButton>
          </Form>
        }
      </Formik>
    </Box>
  )
}

const mapDispatchToProps = dispatch => ({
  addAddress: (data, history) => dispatch(addAddress(data, history)),
});

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm); 