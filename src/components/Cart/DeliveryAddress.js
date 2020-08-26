import React, { useState } from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Grid, Typography, Collapse, IconButton, Button, Box } from '@material-ui/core';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';

const AddressDetails = styled(Typography)`
padding: 12px 0;

`;
const AddressName = styled(Typography)`
padding: 12px 0;
`;

const Container = styled.div`

`
const ContainerAddresses = styled(Paper)`
margin-top: 20px;
padding: 20px;
width: 300px;
background-color: khaki;
`

const Address = ({ address }) => {

  return <Container>
    <AddressName variant="h6">
      <div>{address.name}</div>
    </AddressName>
    <AddressDetails variant="subtitle1">
      <div>{address.street}</div>
      <div>{address.city}</div>
      <div>{address.zip}</div>
    </AddressDetails>
  </Container>

}

export default function DeliveryAddress({
  addresses,
  changeAddress,
  address
}) {

  const [value, setValue] = useState(address.id);
  const [open, setOpen] = useState(false);


  const handleChange = (event) => {
    console.log(event.target.value);
    setValue(Number(event.target.value));
  };

  const openForm = () => {
    setOpen(true);
  };

  const closeForm = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    changeAddress(value);
    setOpen(false);
  };

  const renderAddressRadio = (address, index) => {

    return <Grid container alignItems="center" spacing={2} key = {address.id}>
      <Grid item >
        <Radio value={address.id} key={address.id} checked={value === address.id} />
      </Grid>
      <Grid item >
        <Address address={address} />
      </Grid>
      <Grid item >
        EditIcon
      </Grid>
    </Grid>
  }

  return (

    <ContainerAddresses>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" component="h2">
          Delivery Address
        </Typography>
        <IconButton aria-label="delete" onClick={openForm} color={"primary"} variant="contained" disabled={open}>
          <EditIcon />
        </IconButton>
      </Box>
      {address && <Address address={address} />}
      <Collapse in={open}>
        <RadioGroup
          aria-label="delivery-address"
          name="delivery-address"
          value={value}
          onChange={handleChange}>
          {addresses.map((address, index) => renderAddressRadio(address, index))}
        </RadioGroup>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
          <Button onClick={handleSubmit} color={"primary"} variant="contained">
            Save Change
        </Button>
          <Button onClick={closeForm} color={"secondary"} variant="contained">
            Cancel
        </Button>
        </Box>
      </Collapse>
    </ContainerAddresses>
  )
}
