import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import React from 'react';
import styled from 'styled-components';
import Discount from '../Utils/Discount.js';
import { LinkWrap } from '../Utils/Link.js';
import { PriceTag } from '../Utils/PriceTag.js';
import { ReviewsTooltip } from '../RatingOverview.js';

const Footer = styled.div`
width: 100%;
margin: 10px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
`;
const ImageContainer = styled.div`
padding: 10px 5px;
height: 300px;
position: relative;

& ${Discount}{
  position: absolute;
  right: 0px;
  bottom: 10px;
}

`;
const Image = styled(CardMedia)`
height: 100%;
background-size: contain;
`;
const Description = styled(Typography)`
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;  
overflow: hidden;
`;


export default function Product({product, addToCart}) {

  return (
    <Card >
      <CardContent>
      <LinkWrap to={`/product/${product.id}`}>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
      </LinkWrap>
      <LinkWrap to={`/product/${product.id}/reviews`}>
        <Box display="flex" alignItems="center" >
        {product.reviews_count > 0 && <ReviewsTooltip id={product.id} rating={product.rating} reviews_count={product.reviews_count}/> }
          <Typography variant="subtitle2" component="span">
           {`(${product.reviews_count > 0 ? product.reviews_count: "no reviews"})` }
          </Typography>
        </Box>
      </LinkWrap>
        <Description variant="body2" color="textSecondary" component="p">
          {product.description}
        </Description>
      </CardContent>
      <LinkWrap to={`/product/${product.id}`}>
      <ImageContainer>
      <Image
        image= {product.imageUrls}
        title= {product.name}
      />
        {product.discount > 0 &&
        <Discount>
          {`-${product.discount}%`}
        </Discount>
        }
      </ImageContainer>
      </LinkWrap>
      
    <CardActions>
      <Footer>
        <Button onClick={() => addToCart(product.id)}
              variant="contained"
              color="primary"
             startIcon={<AddShoppingCartIcon />}>
          Add to Cart         
        </Button>
        <PriceTag price={Number (product.price)} oldPrice = {(product.discount) !== 0 ? Number(product.priceBasis) : null}/>
      </Footer>
    </CardActions>
  </Card>   
  );
}

export { Image };
