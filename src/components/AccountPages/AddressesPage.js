import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { LinkWrap } from '../Utils/Link.js';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import { connect, useDispatch } from 'react-redux';
import { fetchAddresses, deleteAddress, FETCH_ADDRESS } from '../../actions';
import { getLoadingInfo, getAddresses } from '../../reducers/selectors.js';
import Tooltip from '@material-ui/core/Tooltip';


const Container = styled(LinkWrap)`
padding-left: 10px;
padding-right: 10px;
min-height: 200px;
border: 2px dashed #ddd;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
box-sizing: border-box;
height: 100%;
`;
const ContainerAddress = styled.div`
padding: 14px;
min-height: 200px;
border: 2px solid #ddd;
display: flex;
flex-direction: column;
justify-content: center;

`;

const AddressDetails = styled(Typography)`
padding: 12px 0;
text-align: center;

`;
const AddressName = styled(Typography)`
padding: 12px 0;
text-align: center;
`;

const Address = ({ address }) => {

  const dispatch = useDispatch();

  return (
    <ContainerAddress>
      <AddressName variant="h6">
        <div>{address.name}</div>
      </AddressName>
      <AddressDetails variant="subtitle1">
        <div>{address.street}</div>
        <div>{address.city}</div>
        <div>{address.zip}</div>
      </AddressDetails>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Tooltip title={"edit"} placement="right">
          <Fab
            size="small"
            aria-label="edit"
            color="inherit"
            component={LinkWrap} to={{
              pathname: "/myaccount/myaddresses/edit",
              state: {
                address: address
              }
            }}>
            <EditIcon />
          </Fab>
        </Tooltip >
        <Tooltip title={"delete"} placement="right">
          <Fab size="small" aria-label="delete" onClick={() => dispatch(deleteAddress(address.id))}>
            <DeleteIcon />
          </Fab>
        </Tooltip>
      </Box>
    </ContainerAddress>
  );
}

const AddressesPage = ({
  addresses,
  isLoading,
}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  return (
    <Grid
      container
      item
      direction="row"
      justify="center"
      spacing={2}>
      <Grid item xs={6} md={2} sm={3}>
        <Container to="/myaccount/myaddresses/add">
          <AddIcon />
          <Typography variant="subtitle1">
            Add Address
          </Typography>
        </Container>
      </Grid>
      {!isLoading && addresses.map((address, index) =>
        <Grid item xs={6} md={2} sm={3} key={index}>
          <Address address={address} />
        </Grid >
      )}
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  isLoading: getLoadingInfo(state, FETCH_ADDRESS),
  addresses: getAddresses(state),
});

export default connect(mapStateToProps)(AddressesPage); 
