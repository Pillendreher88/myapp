import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import {
  Grid,
  Typography,
  Collapse,
  IconButton,
  Button,
  Box,
} from "@material-ui/core";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import AddressForm from "../AccountPages/AddressForm";

const AddressDetails = styled(Typography)`
  padding: 12px 0;
`;

const ContainerAddresses = styled(Paper)`
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  background-color: khaki;
  box-sizing: border-box;
`;

const Address = ({ address }) => {
  return (
    <AddressDetails variant="subtitle1">
      <div>{address.name}</div>
      <div>{address.street}</div>
      <div>{address.city}</div>
      <div>{address.zip}</div>
    </AddressDetails>
  );
};

export default function DeliveryAddress({
  addresses,
  changeAddress,
  deliveryAddress,
  fetchAddresses,
  addAddress,
}) {
  const [open, setOpen] = useState(false);
  const [showAddAddressForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(-1);

  const handleChange = (event) => {
    changeAddress(event.target.value);
    setShowAddForm(false);
    setShowEditForm(false);
    setOpen(false);
  };

  const handleEditClick = (index) => {
    setShowAddForm(false);
    setShowEditForm(index);
  };

  const handleAddClick = () => {
    setShowEditForm(-1);
    setShowAddForm(true);
  };

  const openForm = () => {
    setOpen(true);
  };

  const closeForm = () => {
    setOpen(false);
    setShowAddForm(false);
    setShowEditForm(false);
  };

  const handleSubmitAddressForm = (values, { resetForm }) => {
    addAddress(values, fetchAddresses);
    resetForm();
    closeForm();
  };

  const renderAddressRadio = (address, index) => {
    return (
      <div key={address.id}>
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={2}>
            <Radio
              value={address.id}
              key={address.id}
              checked={deliveryAddress.id === address.id && !showAddAddressForm}
            />
          </Grid>
          <Grid item xs>
            {showEditForm === index ? (
              <AddressDetails variant="subtitle1">Edit Address</AddressDetails>
            ) : (
              <Address address={address} />
            )}
          </Grid>
          {showEditForm !== index && (
            <Grid item xs={2}>
              <IconButton
                aria-label="edit"
                onClick={() => handleEditClick(index)}
                color={"primary"}
                variant="contained"
              >
                <EditIcon />
              </IconButton>
            </Grid>
          )}
        </Grid>
        {showEditForm === index && (
          <AddressForm onSubmit={handleSubmitAddressForm} address={address} />
        )}
      </div>
    );
  };

  return (
    <ContainerAddresses>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="h2">
          Delivery Address
        </Typography>
        <IconButton
          aria-label="delete"
          onClick={openForm}
          color={"primary"}
          variant="contained"
          disabled={open}
        >
          <EditIcon />
        </IconButton>
      </Box>
      {deliveryAddress && !open && <Address address={deliveryAddress} />}
      {addresses.length < 1 && (
        <AddressForm onSubmit={handleSubmitAddressForm} />
      )}
      <Collapse in={open}>
        {deliveryAddress && (
          <RadioGroup
            aria-label="delivery-address"
            name="delivery-address"
            value={deliveryAddress.id}
            onChange={handleChange}
          >
            {addresses.map((address, index) =>
              renderAddressRadio(address, index)
            )}
          </RadioGroup>
        )}
        <Grid container alignItems="center" spacing={2} key="addAddress">
          <Grid item xs={2}>
            <Radio
              value="add"
              key="add"
              checked={showAddAddressForm}
              onChange={handleAddClick}
            />
          </Grid>
          <Grid item xs>
            <AddressDetails variant="subtitle1">Add new Address</AddressDetails>
          </Grid>
        </Grid>
        {showAddAddressForm && (
          <AddressForm onSubmit={handleSubmitAddressForm} />
        )}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Button onClick={closeForm} color={"secondary"} variant="contained">
            Close
          </Button>
        </Box>
      </Collapse>
    </ContainerAddresses>
  );
}
