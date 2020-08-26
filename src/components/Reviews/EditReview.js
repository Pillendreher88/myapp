import React from 'react'
import styled from 'styled-components'
import Rating from '../Rating.js'
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { getLoadingInfo } from '../../reducers/selectors.js';
import { connect } from 'react-redux';

const Row = styled.div`
display: flex;
align-items: center;
margin-bottom: 5px;
& > * {
  margin-right: 10px;
}
`;

const Container = styled.div`
margin: 20px 0;
background-color: black;
color: white;
padding: 10px;
`;

 function EditReview({ review, onClick, isLoading}) {

  return (
    <Container>
      <Row>
        <Typography variant="subtitle1" component="span">
          You have already reviewed this product.
        </Typography>
      </Row>
      <Row>
        <Rating rating={Number(review.rating)} size={24} />
        <Typography variant="subtitle2" component="span" >
          {review.title}
        </Typography>
      </Row>
      <Typography variant="caption" display="block" gutterBottom>
        {"created: " + review.created_at}
      </Typography>
      <Button
                  variant="outlined"
                  color="inherit"
                  onClick={onClick}
                >
                  Edit your review
      </Button>
    </Container>
  )
}

const mapStateToProps = state => ({
  isLoading: getLoadingInfo("EDIT_REVIEW"),
});


export default connect(mapStateToProps)(EditReview);
