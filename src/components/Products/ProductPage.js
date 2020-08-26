import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import ReviewsTop from '../Reviews/ReviewsTop';
import Carousel from '../Utils/Carousel';
import styled from 'styled-components';
import Zoomer from '../Utils/ImageZoomer.js';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { PriceTag } from '../Utils/PriceTag.js';
import Typography from '@material-ui/core/Typography';
import { connect, useDispatch } from 'react-redux';
import { addItem, fetchProduct, fetchReviews, fetchReviewStats, fetchUserReviews } from '../../actions';
import { getProductInfo, getReviews, getReviewStats, getUserReview } from '../../reducers/selectors.js';

const ImageClickable = styled.div`

margin-right: 10px;
${props => props.active && 'border: 3px solid orange;'}
& img{
cursor: pointer;
display: block;
}
`;

const dotsCss = `
margin-bottom: 10px;
`;

const Divider = styled.hr`

margin-bottom: ${props => props.margin}px;
margin-top: ${props => props.margin}px;

`;

const ProductPage = ({
  id,
  product,
  reviews,
  reviewByCurrentUser,
  reviewStats,
  authenticated,
  user }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProduct(id));
    dispatch(fetchReviewStats(id));
    dispatch(fetchReviews(id));
    dispatch(fetchUserReviews(id));
  }, [id, dispatch]);

  const renderDot = (active, index, goToSlide) => {
    return <ImageClickable onClick={goToSlide} active={active} key={index}>
      <img src={product.imageUrls} alt="" height="40px" /></ImageClickable>
  }

  return (
    <>
      <Grid
        style={{ marginTop: "10px" }}
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}>
        <Grid item xs={12} md style={{ maxWidth: "656px" }}>
          <Carousel dotsPos="top" renderDot={renderDot} noArrows dotsCss={dotsCss}>
            <Zoomer imageUrl={product.imageUrls} zoomImageUrl={product.imageUrls} />
            <Zoomer imageUrl={product.imageUrls} zoomImageUrl={product.imageUrls} />
            <Zoomer imageUrl={product.imageUrls} zoomImageUrl={product.imageUrls} />
            <Zoomer imageUrl={product.imageUrls} zoomImageUrl={product.imageUrls} />
          </Carousel>
        </Grid>
        <Grid item xs={12} md >
          {product &&
            <Card key={product.name} raised>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {product.name}
                </Typography>
                <Typography gutterBottom variant="body1" >
                  {product.description}
                </Typography>
                <CardActions>
                  <Button onClick={() => dispatch(addItem(product.id, true))}
                    variant="contained"
                    color="primary"
                    startIcon={<AddShoppingCartIcon />}>
                    Add to Cart
                  </Button>
                  <PriceTag price={Number(product.price)} />
                </CardActions>
              </CardContent>
            </Card>
          }
        </Grid>
      </Grid>
      <Divider margin={30} />
      {reviews ?
        <ReviewsTop
          reviews={reviews}
          reviewStats={reviewStats}
          reviewByCurrentUser={reviewByCurrentUser}
          product={product}
          authenticated={authenticated}
          user={user} /> : null}
      <Divider margin={30} />
    </>
  );
}

ProductPage.propTypes = {
  product: PropTypes.object,
  id: PropTypes.string.isRequired,
  authenticated: PropTypes.bool,
  reviews: PropTypes.array,
  reviewByCurrentUser: PropTypes.object,
  user: PropTypes.object,
}

ProductPage.defaultProps = {
  product: {},
}

const mapStateToProps = (state, ownProps) => ({
  product: getProductInfo(state, ownProps.match.params.id),
  reviews: getReviews(state, ownProps.match.params.id),
  reviewByCurrentUser: getUserReview(state, ownProps.match.params.id),
  reviewStats: getReviewStats(state),
  id: ownProps.match.params.id,
  user: state.auth.user,
  authenticated: state.auth.authenticated,
});

export default connect(mapStateToProps)(ProductPage);