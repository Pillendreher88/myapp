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

const BarContainer = styled.div`

position: absolute;
top: 50%;
left: 50%;
z-index: 200;
`;

const grow = keyframes`
0% {
  top: 8px;
  height: 64px;
}
50%, 100% {
  top: 24px;
  height: 32px;
}
`;

const Bars = styled.div`

  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

& div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: #fff;
  animation: ${grow} 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
& div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
& div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
& div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
  `;

const LoadingBars = () => {
  return(
    <Bars>
      <div></div>
      <div></div>
      <div></div>
    </Bars>
  )
}


export default function LoadingWrapper({loading, children}) {
  return (loading ? 
    <Container>
      <Overlay/> 
      {children}
    </Container> : children
  )
}
