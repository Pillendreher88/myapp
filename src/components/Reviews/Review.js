import React from 'react'
import styled from 'styled-components'
import Comment from './Comment.js'
import Rating from '../Rating.js'
import Typography from '@material-ui/core/Typography';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import urls from '../../urls.js';

const Row = styled.div`
display: flex;
align-items: center;
margin-bottom: 5px;
& > * {
  margin-right: 10px;
}
`;

const Container = styled.div`
margin-bottom: 20px;
background-color: aliceblue;
padding: 10px;
`;

export default function Review({ review, onHelpfulClick }) {

  return (
    <Container>
      <Row>
        <Avatar src={review.author.avatar !== "default.jpg" ? urls.smallAvatar + review.author.avatar : null} />
        <Typography variant="subtitle1" component="span">
          {review.author.name}
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
      <Comment text={review.comment} maxHeight={250} />
      <Row>
        <Typography variant="caption" gutterBottom>
          Was this review helpful??
      </Typography>
        <IconButton aria-label="delete" size="small" onClick={() => onHelpfulClick(review.id, true)}>
          <Box color={(review.isRatedHelpful === true || review.isRatedHelpful === 1) ? 'success.main' : 'text.disabled'}>
            <ThumbUp color='inherit' />
          </Box   >
        </IconButton>
        <IconButton aria-label="delete" size="small" onClick={() => onHelpfulClick(review.id, false)}>
          <Box color={(review.isRatedHelpful === false || review.isRatedHelpful === 0) ? 'error.dark' : 'text.disabled'}>
            <ThumbDown color='inherit' />
          </Box   >
        </IconButton>
      </Row>
      <Row>
        <Typography variant="caption" gutterBottom>
          {review.helpful ? review.helpful : "0"} people find this review helpful.
      </Typography>
      </Row>
    </Container>
  )
}
