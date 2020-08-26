import React from 'react';
import styled, {keyframes} from 'styled-components';

const anim = keyframes`
0%   {background-color:red; }
100% {background-color:grey;}
}
`;

const LoadingLine = ({className}) =>  {
  return (
    <div className = {className}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default styled(LoadingLine)`
flex-grow: 1;

& div {
  width: 25%;
  height: 5px;
  display: inline-block;
  background-color: grey;
  animation-name: ${props => props.loading ? anim : null };
  animation-duration:1s;
  animation-iteration-count: infinite;
}

& div:nth-child(1){
animation-delay: ${props => props.direction === "right" ? "0.12s" : "0.48s" };
}
& div:nth-child(2){
animation-delay: ${props => props.direction === "right" ?  "0.24s" : "0.36s"};
}
& div:nth-child(3){
animation-delay: ${props => props.direction === "right" ? "0.36s" : "0.24s" };
}
& div:nth-child(4){
animation-delay: ${props => props.direction === "right" ? "0.48s" : "0.12s" };
}
`;
