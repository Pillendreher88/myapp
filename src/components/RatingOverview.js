import React from 'react';
import styled, {keyframes} from 'styled-components';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import {fetchReviewStats} from '../actions';
import {getReviewStats, getLoadingInfo} from '../reducers/selectors.js';
import Rating from './Rating';
import Box from '@material-ui/core/Box';
import {connect} from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';

const growing = keyframes`
0%   {transform: scaleX(0); }
100% {transform: scaleX(1);}
}
`;

const Balken = styled.div`
background-color: ${props => props.color ? props.color : "#ff4e00"};
width: ${props => props.width}%;
height: 100%;
animation-name: ${growing};
animation-duration:1s;
animation-iteration-count: 1;
transform-origin: 0px 0px;
`;

const Container = styled.div`
background-color: grey;
margin: 5px 10px;
height: ${props => props.height};
width: ${props => props.width};

`;

const Row = styled.div`
align-items: center;
display: flex;
margin-bottom: 5px;
`;

const CustomizedTooltip = styled((props) => (
  <Tooltip classes={{ popper: props.className, tooltip: 'tooltip' }} {...props} />
))`
  & .tooltip {
    width: 300px;
  }
`;

const calcPercentages = (values) => {
  const total = values.reduce((total, value) => total + value );
  return values.map((value) => Math.floor(value/total * 100));
}
 

const RatingOverview = ({values, label, width, height, color, className, }) => {

  const percentages = calcPercentages(values);

  return (
    <div className={className}>
      {percentages.map((value, index) => 
      <Row key = {index}  >
      <Typography variant="subtitle2" component="span" noWrap>
      {label ? label[index] : index}
      </Typography>
      <Container width = {width} height = {height}>
        <Balken color = {color} width = {value}/>
      </Container>
      <Typography variant="subtitle2" component="span" noWrap>
      {value + "%"}
    </Typography>
      </Row>
      )}
    </div>
  )
}

const ReviewsTooltipComponent = ({
  fetchReviewStats,
  id,
  isLoading,
  rating, 
  reviewStats}) => {

  const label = ["0 stars", "1 stars", "2 stars", "3 stars","4 stars", "5 stars"];

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    if(!open) {
      fetchReviewStats(id);
    }
    setOpen(true);
  };

  const createValues = (reviewStats) => {
    let values = [];
    values.length = 6;
    values.fill(0);
    for(let i = 0; i < reviewStats.perRating.length; i++) {
        let rating = reviewStats.perRating[i].rating;
        let count = reviewStats.perRating[i].total;
        values[rating] = count;

    }
    return values; 
  }

  return (
    <CustomizedTooltip title={
      <Box>
        <Typography variant="h6" component="span" display="block"  gutterBottom>
        ReviewOverview
        </Typography>
        <Box display="flex" alignItems="center" >
          <Rating rating = {Number(rating)}/>
          <Typography variant="subtitle2" component="span" >
          {rating}
          </Typography>
        </Box>
      {(!isLoading && reviewStats &&  reviewStats[id] ) &&
        <RatingOverview values = { createValues(reviewStats[id])} height="15px" width = "60%" label = {label} />}

      </Box>
        } 
      arrow placement="right"
      onClose={handleClose} onOpen={handleOpen}>
        <Box display="flex" alignItems="center" >
          <Rating rating = {Number(rating)}/>
        </Box>
      </CustomizedTooltip>
  )
}

const mapDispatchToProps  = (dispatch) => ({
  fetchReviewStats: (id) => dispatch(fetchReviewStats(id)),
});

const mapStateToProps = (state, ownProps) => ({
  reviewStats: getReviewStats(state),
  isLoading: getLoadingInfo(state,'REVIEW_STATS'),
});

export const ReviewsTooltip = connect(mapStateToProps, mapDispatchToProps)(ReviewsTooltipComponent);


RatingOverview.propTypes = {
  overview: PropTypes.arrayOf(PropTypes.number),
  width: PropTypes.string,
  height: PropTypes.string,
}

export default RatingOverview;

