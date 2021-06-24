import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../../actions";
import { getProductInfo } from "../../reducers/selectors.js";
import { LinkWrap } from "../Utils/Link.js";
import Image from "../Utils/Image.js";
import Typography from "@material-ui/core/Typography";

const OrderItem = ({ id, product, fetchProduct }) => {
  useEffect(() => {
    fetchProduct(id);
  }, [id]);

  return product ? (
    <div>
      <LinkWrap to={`/product/${product.id}`}>
        <Image
          src={product.imageUrls}
          title={product.name}
          alt={product.name}
        />
      </LinkWrap>
      <Typography variant="subtitle2">{product && product.name}</Typography>
    </div>
  ) : null;
};

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id)),
});

const mapStateToProps = (state, ownProps) => ({
  product: getProductInfo(state, ownProps.id),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);
