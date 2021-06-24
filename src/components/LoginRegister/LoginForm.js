import React from "react";
import { Formik, Form } from "formik";
import styled from "styled-components";
import TextFieldUnstyled from "../Utils/FormTextField.js";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import useApiStatus from "../../hooks/useApiStatus.js";
import { connect } from "react-redux";
import { login, LOGIN } from "../../actions";
import useSetFormikFieldErrors from "../../hooks/useSetFormikFieldErrors.js";
import StatusMessage from "../StatusMessage.js";
import CheckIcon from "@material-ui/icons/Check";

const LoadingButton = styled(Button)`
  &.Mui-disabled {
    background-color: ${(props) => (props.isSuccess ? "green" : null)};
    color: ${(props) => (props.isSuccess ? "#fff" : null)};
  }
`;
const TextField = styled(TextFieldUnstyled)`
  margin-top: 8px;
  margin-bottom: 8px;
`;

function LoginForm({ login }) {
  const { isLoading, status, message, errors } = useApiStatus(LOGIN);
  const formikRef = useSetFormikFieldErrors(errors);

  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = "Enter your password";
    }
    return errors;
  };

  const handleSubmit = (values) => {
    login(values);
  };

  return (
    <Box maxWidth="600px" flexGrow="1" mx="auto">
      <Typography variant="h3" component="h1">
        <Box mb={4} mt={2} textAlign="center">
          Welcome Back
        </Box>
      </Typography>
      <StatusMessage apiKey="LOGIN" />
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validate={validate}
        innerRef={formikRef}
      >
        {() => (
          <Form>
            <TextField
              name="email"
              label="E-Mail-address"
              type="email"
              variant="outlined"
              fullWidth
              required
            />
            <TextField
              name="password"
              label="Your Password"
              type="password"
              variant="outlined"
              fullWidth
              required
            />
            <LoadingButton
              variant="contained"
              type="submit"
              color="primary"
              fullWidth
              disabled={isLoading || status === "SUCCESS"}
              isSuccess={status === "SUCCESS"}
            >
              {isLoading && <CircularProgress size={24} color="secondary" />}
              {status === "SUCCESS" && <CheckIcon />}
              {status === "SUCCESS" ? message : "Login"}
            </LoadingButton>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => ({
  login: (creds) => dispatch(login(creds)),
});

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
