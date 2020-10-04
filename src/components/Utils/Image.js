import React, { useState } from 'react'
import styled from 'styled-components'


const ImageContainer = styled.div`
position: relative;
padding-top: 75%;
background-color: grey;

`;
const Image = styled.img`
position: absolute;
left: 0;
top: 0;
width: 100%;
height: auto;
transition: opacity 0.5s;
`;

const ImageResponsive = ({className, children,  ...props}) => {

  const [isLoaded, setLoaded] = useState(false);

  const onLoad = () => {
    setLoaded(true);
  }

  return (
    <ImageContainer className = {className} onLoad = {onLoad} >
      <Image {...props} style = {{opacity: isLoaded ? 1 : 0}}/>
      {children}
    </ImageContainer>
  )
}

export default ImageResponsive