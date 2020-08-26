import React, {useEffect} from 'react'
import { changeAddress, fetchAddresses } from '../../actions';
import { connect } from 'react-redux';
import { getAddresses, getDeliveryAddress } from '../../reducers/selectors';
import DeliveryAddress from './DeliveryAddress';


const Checkout = ({
  addresses,
  deliveryAddress,
  fetchAddresses,
  changeAddress,
}) => {

  useEffect(() => {
    fetchAddresses();
  }, [])

  return (
    <div>
      {addresses.length > 0 &&
        <DeliveryAddress
          addresses={addresses}
          changeAddress={changeAddress}
          address={deliveryAddress} />}
    </div>
  )
}


const mapStateToProps = state => ({
  addresses: getAddresses(state),
  deliveryAddress: getDeliveryAddress(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAddresses: () => dispatch(fetchAddresses()),
  changeAddress: (id) => dispatch(changeAddress(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);