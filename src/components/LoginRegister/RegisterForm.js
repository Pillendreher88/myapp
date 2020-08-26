import React from 'react';
import { Formik, Form } from 'formik';
import styled from 'styled-components';
import TextFieldUnstyled from '../Utils/FormTextField.js';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import useApiStatus from '../../hooks/useApiStatus.js';
import { connect } from 'react-redux';
import { register, REGISTER } from '../../actions';
import  useSetFormikFieldErrors  from '../../hooks/useSetFormikFieldErrors.js';
import CheckIcon from '@material-ui/icons/Check';

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

function RegisterForm(props) {

  const { register } = props;

  const {isLoading, status, errors} = useApiStatus(REGISTER);
  const formikRef = useSetFormikFieldErrors(errors);

  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = 'Enter your password';
    }
    if (values.password.length < 8) {
      errors.password = 'The password must be at least 8 characters long.';
    }
    if (values.password !== values.password_confirmation) {
      errors.password_confirmation = 'The password confirmation does not match.';
    }
    return errors;
  };

  const handleSubmit = (values) => {
    register(values);
  }

  return (
    <Box maxWidth="600px" flexGrow="1" mx="auto">
      <Typography variant="h3" component="h1" >
        <Box mb={4} mt={2} textAlign="center">
          Registration
      </Box>
      </Typography>

      <Formik
        initialValues={{ email: '', password: '', password_confirmation: '', name: '' }}
        onSubmit={handleSubmit}
        validate={validate}
        innerRef = {formikRef}
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
              name="email"
              label="E-Mail-address"
              type="email"
              variant="outlined"
              fullWidth
              required />
            <TextField
              name="password"
              label="Your Password"
              type="password"
              variant="outlined"
              fullWidth
              required />
            <TextField
              name="password_confirmation"
              label="Confirm your Password"
              type="password"
              variant="outlined"
              fullWidth
              required />
            <LoadingButton
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              disabled={isLoading || (status === "SUCCESS")}
              isSuccess={(status === "SUCCESS")}
            >
              {isLoading && <CircularProgress size={24} color="secondary" />}
              {status === "SUCCESS" && <CheckIcon/>}
              {status === "SUCCESS" ? status.message : "Register"}
            </LoadingButton>
          </Form>
        }
      </Formik>
    </Box>
  )
}

const mapDispatchToProps = dispatch => ({
  register: (creds) => dispatch(register(creds)),
});

export default connect(null, mapDispatchToProps)(RegisterForm);