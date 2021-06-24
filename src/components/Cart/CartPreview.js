import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import CartItem from "./CartItem.js";
import { PriceTag } from "../Utils/PriceTag.js";
import { connect } from "react-redux";
import { closePreview } from "../../actions";
import { getTotalPrice } from "../../reducers/selectors";

const DrawerStyled = styled(Drawer)`

& .MuiDrawer-paper {
  padding: 15px;
`;

const FlexContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const Total = styled.div`
  margin: 10px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonLink = styled(Link)`
  width: 100%;
  margin: 10px 0;
`;

const Content = styled.div`
  overflow-y: scroll;
  flex-grow: 1;
`;

const Footer = styled.div`
  background-color: #21385c;
  color: white;
`;

const CartPreview = ({
  products,
  cart,
  totalPrice,
  open,
  close,
  recentlyAdded,
}) => {
  return (
    <DrawerStyled anchor="right" open={open} onClose={close}>
      <Container>
        <Content>
          <Box
            display="flex"
            flexWrap="nowrap"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography variant="h3" gutterBottom>
              Your Cart
            </Typography>
            <IconButton onClick={() => close()}>
              <CloseIcon />
            </IconButton>
          </Box>
          <FlexContainer>
            {cart.map((product) => {
              return (
                <CartItem
                  id={product.id}
                  quantity={product.quantity}
                  product={products && products[product.id]}
                  key={product.id}
                  recentlyAdded={recentlyAdded === product.id}
                />
              );
            })}
          </FlexContainer>
        </Content>
        <Footer>
          <Total>
            <Box mr={3}>
              <Typography variant="h6" component="div">
                Total
              </Typography>
            </Box>
            <PriceTag price={totalPrice} color="inherit" />
          </Total>
          <Button
            variant="contained"
            color="primary"
            to="/cart"
            component={ButtonLink}
            onClick={() => close()}
          >
            Checkout
          </Button>
        </Footer>
      </Container>
    </DrawerStyled>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart.cart,
  open: state.cart.preview.open,
  recentlyAdded: state.cart.preview.recentlyAdded,
  totalPrice: getTotalPrice(state),
});

const mapDispatchToProps = (dispatch) => ({
  close: () => dispatch(closePreview()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPreview);
