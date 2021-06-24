import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveIcon from "@material-ui/icons/Remove";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import styled from "styled-components";
import { LinkWrap } from "../Utils/Link.js";
import { PriceTag } from "../Utils/PriceTag.js";
import Image from "../Utils/Image.js";
import Tooltip from "@material-ui/core/Tooltip";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { deleteItem, addItem, decreaseQty, fetchProduct } from "../../actions";
import { getProductInfo } from "../../reducers/selectors.js";
import Box from "@material-ui/core/Box";

const Content = styled.div`
  padding-bottom: 10px;
  padding-top: 10px;

  &:not(:last-child) {
    border-bottom: 1px solid black;
  }
  background-color: ${(props) =>
    props.recentlyAdded ? "rgb(143, 188, 143, 0.5)" : "inherit"};
`;
const LeftInfo = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
`;
const Details = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-left: 20px;
`;
const CartItem = ({
  id,
  quantity,
  deleteItem,
  decreaseQty,
  addItem,
  fetchProduct,
  product,
  recentlyAdded,
}) => {
  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  const renderInfo = () => {
    return (
      <Grid container alignItems="center">
        <Grid item xs={12} sm={4}>
          <LinkWrap to={`/product/${product.id}`}>
            <Image src={product.imageUrls} />
          </LinkWrap>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Details>
            <LinkWrap to={`/product/${product.id}`}>
              <Typography gutterBottom variant="h6">
                {product.name}
              </Typography>
            </LinkWrap>
            <Typography variant="caption">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </Details>
        </Grid>
      </Grid>
    );
  };

  const renderActions = () => {
    return (
      <Grid container alignItems="center" justify="space-between">
        <Grid item lg={12}>
          <Button onClick={() => deleteItem(id)} endIcon={<DeleteIcon />}>
            <Typography variant="caption">Delete</Typography>
          </Button>
        </Grid>
        <Grid item lg={12}>
          <LeftInfo>
            <Tooltip title={"Remove one Copy"} placement="left">
              <IconButton
                onClick={() =>
                  quantity > 1 ? decreaseQty(id) : deleteItem(id)
                }
              >
                <RemoveIcon />
              </IconButton>
            </Tooltip>
            <Typography variant="button">{quantity}</Typography>
            <Tooltip title={"Add one Copy"} placement="right">
              <IconButton onClick={() => addItem(id)}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </LeftInfo>
        </Grid>
        <Grid item lg={12}>
          <PriceTag
            price={product.price * quantity}
            oldPrice={
              product.discount !== 0
                ? Number(product.priceBasis * quantity)
                : undefined
            }
          />
        </Grid>
      </Grid>
    );
  };

  return (
    <Content recentlyAdded={recentlyAdded}>
      {product ? (
        <Grid container alignItems="center" justify="space-between">
          <Grid item xs={12} lg={8}>
            {renderInfo()}
          </Grid>
          <Grid item xs={12} lg={2}>
            {renderActions()}
          </Grid>
        </Grid>
      ) : null}
      {recentlyAdded && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          mt={1}
          pr={2}
        >
          <CheckIcon />
          <Typography variant="caption">
            This item was successfully added to your cart.
          </Typography>
        </Box>
      )}
    </Content>
  );
};

CartItem.propTypes = {
  quantity: PropTypes.number.isRequired,
  addItem: PropTypes.func.isRequired,
  product: PropTypes.object,
  fetchProduct: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  decreaseQty: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

CartItem.defaultProps = {
  product: {},
};

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(deleteItem(id)),
  addItem: (id) => dispatch(addItem(id)),
  decreaseQty: (id) => dispatch(decreaseQty(id)),
  fetchProduct: (id) => dispatch(fetchProduct(id)),
});

const mapStateToProps = (state, ownProps) => ({
  product: getProductInfo(state, ownProps.id),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
