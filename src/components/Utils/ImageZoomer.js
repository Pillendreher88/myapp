import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';


const Container = styled.div`
position: relative;
overflow: hidden;
`;

const ZoomedImage = styled.img.attrs(props => ({
  style: {
    transform: props.active ? ` translate(${props.posX}px, ${props.posY}px) scale(${props.zoomFactor})` : "scale(1)",
  },
}))`
max-width: 100%;
height: auto;
transform-origin: 0px 0px 0px;
display: block;
cursor: zoom-in;
`;

export default function ImageZoomer({
  imageUrl,
  width,
  height,
  zoomFactor,
}) {

  const [state, setState] = useState({x: null, y: null, active: false});
  const imageRef = useRef();
  
  const getCursorPos = (e) =>  {

    let x = 0, y = 0;
    e = e || window.event;
  
    const imagePos = imageRef.current.getBoundingClientRect();
  
    x = e.pageX - imagePos.left;
    y = e.pageY - imagePos.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset; 
    return {x : x, y : y};
  }

  const getSmallImageSize = () => {
   
    return  { width: imageRef.current.offsetWidth, 
              height: imageRef.current.offsetHeight}
  }

  const moveZoomArea = (e) => {
  
    e.preventDefault();
    let {x,y} = getCursorPos(e);

    const {width : smallImageWidth, height: smallImageHeight} = getSmallImageSize();
    const largeImageWidth = zoomFactor * smallImageWidth;
    const largeImageHeight = zoomFactor * smallImageHeight;
    const ratioX = smallImageWidth/(largeImageWidth - smallImageWidth);
    const ratioY = smallImageHeight/(largeImageHeight - smallImageHeight);
    x = Math.round(x * ratioX) * -1;
    y = Math.round(y * ratioY) * -1;
    if (x < smallImageWidth - largeImageWidth) {x = smallImageWidth - largeImageWidth;}
    if (x > 0) {x = 0;}
    if (y < smallImageHeight - largeImageHeight) {y = smallImageHeight - largeImageHeight;}
    if (y > 0) {y = 0;} 
  
    setState({x, y, active: true});
  }

  const handleMouseEnter =(e) => {
    e.preventDefault();
    setState({...state, active: true});
  }
  const handleMouseLeave = (e) => {
    e.preventDefault();
    setState({...state, active: false});
  }

  return (
    <Container onMouseMove = {moveZoomArea} onMouseLeave= {handleMouseLeave} onMouseEnter = {handleMouseEnter} ref = {imageRef}>
      <ZoomedImage src = {imageUrl} posX={state.x}  posY={state.y} active = {state.active} {...{height , width, zoomFactor}}/>
    </Container>
  )
}

ImageZoomer.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  zoomFactor: PropTypes.number,
  imageUrl: PropTypes.string,
}

ImageZoomer.defaultProps = {
  zoomFactor: 2,
}

