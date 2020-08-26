import React from 'react';
import CartItem from './CartItem.js';
import PriceCard from './PriceCard.js';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { CardContent } from '@material-ui/core';
import Delivery from './Delivery.js';
import { connect } from 'react-redux';
import { getAddresses, getDeliveryAddress, getTotalPrice, getDelivery, getProductsPrice, getDeliveryPrice } from '../../reducers/selectors';
import { changeDelivery } from '../../actions';


const Container = styled.div`
margin-bottom: 20px;
margin-top: 20px;
background-color: rgba(0,0,0,0.2);
text-align: center;
padding-top: 100px;
padding-bottom: 100px;
width: 100%;
`;

const Tile = styled(Grid)`
margin-bottom: 15px;
`;

const CartContainer = styled.div`

margin-top: 25px ;
min-height: 600px;

@media (min-width: 600px) {
  padding: 25px;
  background-color: whitesmoke;
}

`;

const Title = styled(Typography)`
margin-bottom: 15px;
`;

const Cart = ({
  products,
  cart,
  totalPrice,
  productsPrice,
  delivery,
  deliveryPrice,
  changeDelivery,
}) => {

  return (
    <CartContainer>
      {cart.length > 0 ?
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid
            item
            sm={8} xs={12}
            container
            direction="column"
          >
            <Tile item>
              <Card>
                <CardContent>
                  <Title variant="h4" component="h2">
                    Your Cart
                  </Title>
                  {cart.map(product => {
                    return <CartItem id={product.id}
                      key={product.id}
                      quantity={product.quantity}
                      product={products && products[product.id]} />
                  })}
                </CardContent>
              </Card>
            </Tile>
            <Tile item>
              <Delivery delivery={delivery} onChange={changeDelivery} />
            </Tile>
          </Grid>
          <Grid item sm={4} xs={12}>
            <PriceCard price={totalPrice} productsPrice={productsPrice} deliveryPrice={deliveryPrice} />
          </Grid>
        </Grid> :
        <Container>
          <Typography variant="h6" display="block" gutterBottom>
            Youre ShoppingCart is empty.
          </Typography>
        </Container>
      }
    </CartContainer>
  );
}

const mapStateToProps = state => ({
  cart: state.cart.cart,
  totalPrice: getTotalPrice(state),
  productsPrice: getProductsPrice(state),
  addresses: getAddresses(state),
  deliveryAddress: getDeliveryAddress(state),
  delivery: getDelivery(state),
  deliveryPrice: getDeliveryPrice(state),
});

const mapDispatchToProps = dispatch => ({
  changeDelivery: (delivery) => dispatch(changeDelivery(delivery)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);