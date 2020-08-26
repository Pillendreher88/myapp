import React, { useState } from 'react'
import Review from './Review.js'
import RatingOverview from '../RatingOverview.js'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Rating from '../Rating';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import ReviewForm from './ReviewForm'
import { postHelpful } from '../../actions';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EditReview from './EditReview.js';
import background from '../../images/backgrounds/circle-blues.png';

const Header = styled.div`
& > * {
  vertical-align: middle;
  margin-right: 10px;
}
`;
const WriteReview = styled(Button)`
margin-top: 15px;
`;

const Box = styled.div`
background-image: url(${background});
padding: 20px; 
border-radius: 10%;
color: white;
`;

const Container = styled.div`
margin-bottom: 20px;
margin-top: 20px;
background-color: rgba(0,0,0,0.2);
text-align: center;
padding-top: 100px;
padding-bottom: 100px;
flex-basis: 100%;
width: 100%;
`;


const ReviewsTop = ({
  reviews,
  reviewByCurrentUser,
  reviewStats,
  product,
  postHelpful,
  editReview,
  authenticated }) => {

  const location = useLocation();
  const [isFormOpen, setFormOpen] = useState(false);
  const history = useHistory();

  const closeForm = () => {
    setFormOpen(false);
  }
  const openForm = () => {
    if (authenticated) {
      setFormOpen(true);
    }
    else {
      history.push({
        pathname: "/login",
        state: { modalOpen: true, redirectTo: location.pathname }
      });
    }
  }

  const goToLogin = () => {
    history.push({
      pathname: "/login",
      state: { modalOpen: false, redirectTo: location.pathname }
    });
  }

  const createValues = (reviewStats) => {
    let values = [];
    values.length = 6;
    values.fill(0);
    for (let i = 0; i < reviewStats.perRating.length; i++) {
      let rating = reviewStats.perRating[i].rating;
      let count = reviewStats.perRating[i].total;
      values[rating] = count;

    }
    return values;
  }

  const label = ["0 stars", "1 stars", "2 stars", "3 stars", "4 stars", "5 stars"];

  const renderReview = (review, index) => {

    return <Review review={review} key={review.title + index} onHelpfulClick={authenticated ? postHelpful : goToLogin} />
  }

  return (

    <Grid
      container
      item
      direction="row"
      justify="space-around"
      spacing={2}>
      <ReviewForm
        open={isFormOpen}
        onClose={closeForm}
        product={product}
        onEdit = {editReview}
        initialValues={reviewByCurrentUser} />
      {!reviews ? null : ((reviews.length > 0) ?
        <>
          <Grid item xs={12} md={5} sm={8}>
            <Box>
              <Typography variant="h6" component="span" display="block" gutterBottom>
                ReviewOverview
          </Typography>
              <Header>
                <Rating rating={product.rating} />
                <Typography variant="subtitle2" component="span" >
                  {product.rating}
                </Typography>
              </Header>
              <Typography variant="caption" display="block" gutterBottom>
                {product.reviews_count + " total reviews"}
              </Typography>
              {(!reviewStats.isLoading && reviewStats[product.id]) &&
                <RatingOverview values={createValues(reviewStats[product.id])} height="15px" width="60%" label={label} />}
              {!reviewByCurrentUser &&
                <WriteReview
                  variant="outlined"
                  color="inherit"
                  onClick={openForm}
                >
                  Write a Review
                </WriteReview> 
                }
            </Box>
            {reviewByCurrentUser &&
              <EditReview review = {reviewByCurrentUser} onClick = {openForm}/>
            }
          </Grid>
          <Grid item xs={12} md={7} sm={10}>
            {reviews.map((review, index) => renderReview(review, index))}
          </Grid>
          <Button variant="contained"
            color="primary"
            to={location.pathname.concat("/reviews")}
            component={Link}>
            Browse All Reviews
      </Button></> :
        <Container>
          <Typography variant="h6" display="block" gutterBottom>
            This product has not been reviewed yet.
          </Typography>
          <WriteReview
            variant="outlined"
            color="inherit"
            onClick={openForm}
          >
            Write a Review
        </WriteReview>
        </Container>)}
    </Grid>
  )
}

const mapDispatchToProps = dispatch => ({
  postHelpful: (id, isHelpful) =>
    dispatch(postHelpful(id, isHelpful)),
});


export default connect(null, mapDispatchToProps)(ReviewsTop);