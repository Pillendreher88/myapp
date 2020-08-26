import React, {useState} from 'react';
import Star from './Utils/Star.js';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
color: ${props => props.color};
display: inline-flex;
font-size: ${props => props.size ? props.size : 24}px;
justify-content: center;
`;

export default function RatingInput({onChange, rating, input,name, color, size}) {

  
  const [visibleRating, setVisibleRating] = useState(rating);
  const wrapperProps = {color : visibleRating === 0 ? "grey" : color, size};

  const onClick = (index) => {
    setVisibleRating(index);
    onChange(index);
  }
  const onMouseOver = (index) => {
    setVisibleRating(index);
  }
  const onMouseLeave = (index) => {
    setVisibleRating(rating);
  }

  const renderInputStars = () => {
    let stars = [];
    for(let i = 1; i < 6; i++) {
      stars.push(<Star fontSize="inherit" 
                        key = {i} 
                        filled  ={(i < visibleRating + 1 ) ? "full" : "empty"}
                        style = {{cursor: "pointer"}}
                        onClick = {() => onClick(i)} 
                        onMouseLeave = {() => onMouseLeave(i)}
                        onMouseOver = {() => onMouseOver(i)}/>);
     
    }
    return stars;
  }

  const renderStars = () => {
    let stars = [];
    let score = rating * 10;
  
    for(let i = 0; i < 5; i++) {
      let filled = "empty";
      if(score >= 10) {
        filled = "full";
        score -= 10;
      }
      else  if (score >= 5) {
        filled = "half";
        score -= 5;
      }

    stars.push(<Star fontSize="inherit" key = {i} filled={filled}/>)
    }
      
    return stars;
  }

  return (
      <Container {...wrapperProps}>
      {input && <input name = {name} onChange={onChange} type="hidden"/>}
      {input ? renderInputStars() :renderStars() }
      </Container>
  )
}

RatingInput.propTypes = {
  color: PropTypes.string,
}

RatingInput.defaultProps = {
  color: '#ff4e00',
}
