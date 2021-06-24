import React from "react";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { addAddress } from "../../actions/index.js";
import AddressForm from "./AddressForm";

import { connect } from "react-redux";

function AddAddressPage({ addAddress, location = {} }) {
  const address = location.state ? location.state.address : null;
  const history = useHistory();

  const handleSubmit = (values) => {
    addAddress(values, () => history.push("/myaccount/myaddresses"));
  };

  return (
    <Box maxWidth="600px" flexGrow="1" mx="auto">
      <Typography variant="h3" component="h1">
        <Box mb={4} mt={2} textAlign="center">
          {address ? "Edit Address" : "Add a new Address"}
        </Box>
      </Typography>
      <AddressForm address={address} onSubmit={handleSubmit} />
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addAddress: (data, history) => dispatch(addAddress(data, history)),
});

const mapStateToProps = (state) => ({
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAddressPage);
