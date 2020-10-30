import React from 'react';
import styled, {keyframes} from 'styled-components';

const Container = styled.div`
position: relative;
`;
const opacity = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 0.7;
}
`;

const Overlay = styled.div`
width: 100%;
height: 100%;            
position: absolute;
top: 0;
left: 0;
opacity: 0.7;
background-color: white;
animation: ${opacity} 1s cubic-bezier(0, 0.5, 0.5, 1) 1;
z-index: 2;
`;

export default function LoadingWrapper({loading, children}) {
  return (loading ? 
    <Container>
      <Overlay/> 
      {children}
    </Container> : children
  )
}
