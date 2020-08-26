import React from 'react'
import CardMedia from '@material-ui/core/CardMedia';
import styled from 'styled-components'

const Image = styled(CardMedia)`
background-size: contain;
height: 100%;
width: 100%;
`;

const ImageContainer = styled.div`
position: relative;
width: 70px;
height: 100px;
padding: 5px;
background-color: white;
`;

const ImageOverlay = styled.div`
position: absolute;
top: 0;
right: 0;
left: 0;
bottom: 0;
background: rgba(26, 26, 26, 0.04);
`;



export default function ProductImage({ product }) {
  return (
    <ImageContainer>
      {product.imageUrls &&
        <Image
          image={product.imageUrls}
          title={product.name}
        />}
      <ImageOverlay />
    </ImageContainer>
  )
}

