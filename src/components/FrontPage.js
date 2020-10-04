import Typography from '@material-ui/core/Typography';
import React, { useEffect } from "react";
import styled, { css } from 'styled-components';
import Carousel from './Utils/Carousel';
import Discount from './Utils/Discount.js';
import { LinkWrap } from './Utils/Link.js';
import { PriceTag } from './Utils/PriceTag.js';
import { connect, useDispatch } from 'react-redux';
import { fetchPromotedItems } from '../actions';
import { getProductsDiscount, getProductsNew } from '../reducers/selectors.js';
import { Grid } from '@material-ui/core';
import background from '../images/backgrounds/vintage-wallpaper.png';
import Image from './Utils/Image.js'

const Screenshots = styled(Grid)`
grid-area: 2 / 2 / 3 / 3;

@media (max-width: 700px) {
  display: none ;
}
`;

const PageContainer = styled.div`
margin-top: 30px;
`;

const MainImage = styled.div`
grid-area: 1 / 1 / 6 / 2;
width: 100%;

@media (max-width: 700px) {
  grid-area: 2 / 1 / 3 / 2;
}

`;

const Title = styled.div`
grid-area: 1 / 2 / 2 / 3;
display: flex;
align-items: center;
justify-content: center;
color: white;

@media (max-width: 700px) {
  grid-area: 1 / 1 / 2 / 2;
}
`;

const InfoContainer = styled.div`
grid-template-columns: 6fr 4fr ;
display:grid;
grid-column-gap: 8px;
background-image: url(${background});

@media (max-width: 700px) {
  grid-template-columns: auto ;
}

`;

const FooterInfo = styled.div`
grid-area: 3 / 2/ 4 / 3;
background-color: white;
display: flex;
margin-top: 10px;
align-items: center;
justify-content: flex-end;
height: 60px;
padding-right: 16px;

@media (max-width: 700px) {
  grid-area: 3 / 1 / 4 / 2;
}
`;

const CarouselContainer = styled.div`
margin: auto;
max-width: 960px;
padding-bottom: 30px;
`;

const arrowCss = css`
@media (max-width: 700px) {
  bottom: ${props => -props.size * 0.5 - 20}px;
  top: auto;
  right: ${props => props.direction === "right" ? (0 - props.arrowPosition + props.size + 10) : null}px;
  left: ${props => props.direction === "left" ? (0 - props.arrowPosition + props.size + 10) : null}px;
  font-size: ${props => props.size * 0.5}px;
}`



const Info = ({ product }) => {

  return (
    <InfoContainer>
      <MainImage >
        <Image src={product.imageUrls} alt={product.name} />
      </MainImage>
      <Title>
        <Typography variant="h5" gutterBottom>
          {product.name}
        </Typography>
      </Title>
      <Screenshots
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={2}>
        {[1, 2, 3, 4].map((value) =>
          <Grid item xs={6} key={value}>
            <Image src={product.imageUrls} key={product.imageUrls + value} />
          </Grid>
        )}
      </Screenshots>
      <FooterInfo>
        {product.discount > 0 &&
          <Discount>
            {`-${product.discount}%`}
          </Discount>
        }
        <PriceTag price={Number(product.price)} oldPrice={(product.discount) !== 0 ? Number(product.priceBasis) : undefined} />
      </FooterInfo>
    </InfoContainer>
  );
}

const FrontPage = ({ productsDiscount, productsNew }) => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPromotedItems());
  }, [dispatch]);

  return (
    <PageContainer>
      <CarouselContainer>
        <Typography variant="h5" gutterBottom>
          New Products
        </Typography>
        <Carousel
          arrowPosition={20}
          arrowCss={arrowCss}>
          {productsNew && productsNew.map(product =>
            <LinkWrap to={`/product/${product.id}`} key={product.id}>
              <Info product={product} />
            </LinkWrap>
          )}
        </Carousel>
      </CarouselContainer>
      <CarouselContainer>
        <Typography variant="h5" gutterBottom>
          Discounts
        </Typography>
        <Carousel
          arrowPosition={20}
          arrowCss={arrowCss}>
          {productsDiscount && productsDiscount.map(product =>
            <LinkWrap to={`/product/${product.id}`} key={product.id}>
              <Info product={product} />
            </LinkWrap>
          )}
        </Carousel>
      </CarouselContainer>
    </PageContainer>
  );
}

const mapStateToProps = (state) => ({
  productsDiscount: getProductsDiscount(state),
  productsNew: getProductsNew(state),
});

export default connect(mapStateToProps)(FrontPage);

