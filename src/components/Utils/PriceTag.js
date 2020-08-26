import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

const Tag = styled(Typography)`
color: ${props => props.color ? props.color : "#B12704"};
`;

const OldPrice = styled.span`
color: ${props => props.colorOld ? props.colorOld : "#6f6f6f"};
text-decoration: line-through;
`;
const Container = styled.div`
position: relative;
display: inline-flex;
flex-direction: column;
`;



export const PriceTag = ({price = 0, oldPrice, variant = "h6", color, colorOld}) => {
  return  (
    <Container>
    {oldPrice && <OldPrice colorOld = {colorOld}>{ `EUR  ${oldPrice.toFixed(2)}`}</OldPrice>
    }
    <Tag component="span" variant={variant} color = {color}>
      { `EUR  ${price.toFixed(2)}`}
    </Tag>
    </Container>
  );
 
}

PriceTag.propTypes = {
  price: PropTypes.number,
  oldPrice: PropTypes.number,
}

PriceTag.defaultProps = {
  price: 0,
}




