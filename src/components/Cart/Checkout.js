import React, { useEffect, useState } from "react";
import {
  changeAddress,
  fetchAddresses,
  addAddress,
  emptyCart,
  createPaymentIntent,
} from "../../actions";
import useApiStatus from "../../hooks/useApiStatus.js";
import { connect } from "react-redux";
import { getAddresses, getDeliveryAddress } from "../../reducers/selectors";
import DeliveryAddress from "./DeliveryAddress";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckIcon from "@material-ui/icons/Check";
import styled from "styled-components";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";

const SubmitButton = styled(Button)`
  &.Mui-disabled {
    background-color: ${(props) => (props.isSuccess ? "green" : null)};
    color: ${(props) => (props.isSuccess ? "#fff" : null)};
  }
`;

const ContainerCard = styled(Paper)`
  margin-top: 20px;
  padding: 20px;
  width: 100%;
  background-color: #6772e5;
  color: white;
  box-sizing: border-box;
`;

const ErrorMessage = styled.div`
  margin: 10px auto;
  color: red;
  text-align: center;
`;

const Checkout = ({
  addresses,
  cart,
  addAddress,
  deliveryAddress,
  fetchAddresses,
  changeAddress,
  emptyCart,
  createPaymentIntent,
  clientSecret,
  total,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const { isLoading: isLoadingIntent } = useApiStatus("CREATE_PAYMENT");

  useEffect(() => {
    fetchAddresses();
    createPaymentIntent({ cart: cart.cart, delivery: cart.delivery });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#fff",
        iconColor: "#fff",
        fontWeight: 500,
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#87bbfd",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    setLoading(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setLoading(false);
      setSucceeded(false);
    } else {
      setError(null);
      setLoading(false);
      setSucceeded(true);
      emptyCart();
    }
  };

  return (
    <Box maxWidth="500px" mx="auto" width="100%">
      <DeliveryAddress
        addresses={addresses}
        changeAddress={changeAddress}
        deliveryAddress={deliveryAddress}
        fetchAddresses={fetchAddresses}
        addAddress={addAddress}
      />
      <form id="payment-form" onSubmit={handleSubmit}>
        <ContainerCard>
          <Box mb={2}>
            <Typography variant="h5" component="h2">
              Payment Method
            </Typography>
          </Box>
          <CardElement options={cardStyle} />
          <Box mt={2}>
            <p>
              The following card numbers are for simulating payment. Set
              expiration date to any date in the future with the format MM/YY
              and CVC to any 3-digits number.
            </p>
            <Box display="flex">
              <Box flexGrow="1">Payment succeeds</Box>
              <Box>4242 4242 4242 4242</Box>
            </Box>
            <Box display="flex">
              <Box flexGrow="1">Payment is declined</Box>
              <Box>4000 0000 0000 9995</Box>
            </Box>
          </Box>
        </ContainerCard>
        <Box my={2}>
          <SubmitButton
            disabled={isLoading || succeeded || isLoadingIntent}
            isSuccess={succeeded}
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
          >
            {(isLoading || isLoadingIntent) && (
              <CircularProgress size={24} color="secondary" />
            )}
            {succeeded && <CheckIcon />}
            {succeeded ? "Payment successful" : "Pay " + total / 100 + " EUR"}
          </SubmitButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Box>
      </form>
    </Box>
  );
};

const mapStateToProps = (state) => ({
  addresses: getAddresses(state),
  deliveryAddress: getDeliveryAddress(state),
  cart: state.cart,
  clientSecret: state.auth.stripeSecret,
  total: state.cart.total,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAddresses: () => dispatch(fetchAddresses()),
  changeAddress: (id) => dispatch(changeAddress(id)),
  emptyCart: () => dispatch(emptyCart()),
  addAddress: (data, onSuccess) => dispatch(addAddress(data, onSuccess)),
  createPaymentIntent: (data) => dispatch(createPaymentIntent(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
