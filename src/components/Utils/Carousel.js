import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import Left from '@material-ui/icons/ChevronLeft';
import Right from '@material-ui/icons/ChevronRight';
import PropTypes from 'prop-types';


const Container = styled.div`

position: relative;
margin: auto;

`;

const Slider = styled.div`
position: relative;
width:  ${props => props.width ? props.width + 'px' : 100 + '%'};
overflow: hidden;
box-shadow: 0 0 5px 4px #000;

`;

const Dot = styled.div`
padding: 10px;
margin-right: 5px;
margin-top: 10px;
cursor: pointer;
border-radius: 50%;
background-color: ${props => props.active ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.3)'};

&:hover {
  background-color: ${props => props.active ? 'rgba(0,0,0,0.9)' : 'rgba(0,0,0,0.6)'};
}
`;

const Dots = styled.div`
width: 100%;
display: flex;
justify-content: center;
align-items: center;

${props => props.dotsCss && props.dotsCss}
`;

const Slide = styled.li`
width: 100%;
overflow: hidden;
`;

const ArrowUnstyled = ({ direction, handleClick, className }) => {
  return (
    <div onClick={handleClick} className={className}>
      {direction === 'right' ? <Right fontSize="inherit" /> : <Left fontSize="inherit" />}
    </div>
  );
}

const Arrow = styled(ArrowUnstyled)`
position: absolute;
top: 50%;
right: ${props => props.direction === "right" ? (0 - props.arrowPosition - props.size - 10) : null}px;
left: ${props => props.direction === "left" ? (0 - props.arrowPosition - props.size - 10) : null}px;
box-sizing: border-box;
font-size: ${props => props.size}px;
display: flex;
padding: 10px;
cursor: pointer;
color: white;
font-weight: bold;
background-color: rgba(0,0,0, 0.2);
transform: translateY(-50%);
z-index: 2;
border-radius: 20%;

&:hover {
  background-color: rgba(0,0,0,0.8);
}

${props => props.arrowCss && props.arrowCss}

`;


const createTransformStyle = (translate, translateTouch, transitionTime) => ({
  transform: `translateX(${translate}%) translateX(${translateTouch}px)`,
  transition: `transform ease-out ${transitionTime}s`,
});

const SliderContentUnstyled = ({ children, style, className }) => {

  return (
    <ul className={className} style={style}>
      {children.map((item, index) =>
        <Slide key={index}>{item}</Slide>
      )}
    </ul>
  );
}

const SliderContent = styled(SliderContentUnstyled)`
  height: 100%;
  margin: 0;
  width: ${props => props.slides * 100}%;
  display: flex;
  list-style: none;
  padding-left: 0;
`;

const Carousel = ({ height,
  width,
  transitionTime = 0.5,
  autoPlayTime,
  arrowCss,
  dotsCss,
  arrowSize = 40,
  arrowPosition = 0,
  swipeThreshold,
  renderDot,
  noArrows,
  dotsPos,
  children }) => {

  const [autoPlay, setAutoPlay] = useState(autoPlayTime !== undefined);
  const [state, setState] = useState({ animation: false, offset: 1, offsetPx: 0, selected: 0 });
  const [swipeState, setSwipeState] = useState({ swipeStart: null, isSwiping: false });
  const length = React.Children.count(children);
  const { selected, animation } = state;
  const { isSwiping } = swipeState;

  const createSlides = () => {

    let slides = [];

    React.Children.forEach(children, (child, index) => {
      if (index === 0) {
        const firstClone = React.cloneElement(children[length - 1], { key: "cloned0" });
        slides.push(firstClone);
      }
      slides.push(child);

      if (index === length - 1) {
        const lastClone = React.cloneElement(children[0], { key: "cloned0" });
        slides.push(lastClone);
      }
    });

    return slides;
  }

  useEffect(() => {

    if (autoPlayTime && autoPlay && !isSwiping && !animation) {
      const timerAutoplay = setTimeout(nextSlide, autoPlayTime * 1000);
      return () => {
        clearTimeout(timerAutoplay);
      }
    }
  }, [autoPlay, animation, isSwiping])

  const pauseAutoPlay = () => {
    setAutoPlay(false);
  }

  const startAutoPlay = () => {
    setAutoPlay(true);
  }

  const setTimerAnimEnd = (animState) => {

    let offsetAfterAnim = animState.offset;

    if (offsetAfterAnim === 0) {
      offsetAfterAnim = length;
    }
    else if (offsetAfterAnim === length + 1) {
      offsetAfterAnim = 1;
    }

    setTimeout(() => {
      setState({ ...animState, animation: false, offset: offsetAfterAnim });
    }, transitionTime * 1000);

  }

  const changeSlide = (index) => {
    if (animation) return;

    let animationOffset = index + 1;
    if (selected === 0 && index === length - 1) {
      animationOffset = 0;
    }
    else if (selected === length - 1 && index === 0) {
      animationOffset = length + 1;
    }

    const animState = { selected: index, animation: true, offset: animationOffset, offsetPx: 0 };
    setState(animState);
    setTimerAnimEnd(animState);
  }

  const getPosition = () => {
    let countSlides = length + 2;
    return -state.offset * 100 / countSlides;
  }

  const prevSlide = () => {

    let newSelected = selected - 1;
    if (newSelected < 0) {
      newSelected = length - 1;
    }
    changeSlide(newSelected);
  }

  const nextSlide = () => {

    let newSelected = selected + 1;
    if (newSelected > length - 1) {
      newSelected = 0;
    }
    changeSlide(newSelected);
  }

  const renderDotDefault = (active, index) => {
    return <Dot active={active}
      onClick={() => changeSlide(index)}
      key={index} />
  }

  const renderDots = () => {

    return <Dots dotsCss={dotsCss}>
      {children.map((item, index) =>
        renderDot ? renderDot(index === selected, index, () => changeSlide(index)) :
          renderDotDefault(index === selected, index)
      )}
    </Dots>
  }

  const onTouchStart = (event) => {

    if (animation) return;
    const touchX = event.targetTouches[0].clientX;
    setSwipeState({ isSwiping: true, swipeStart: touchX });
  }

  const onTouchMove = (event) => {

    if (animation || !isSwiping) return;
    const touchX = event.targetTouches[0].clientX;
    const deltaX = touchX - swipeState.swipeStart;
    setState({ ...state, offsetPx: deltaX });
  }

  const onTouchEnd = (event) => {
    if (animation || !isSwiping) return;
    setSwipeState({ isSwiping: false });

    if (state.offsetPx > swipeThreshold) {
      prevSlide();
    }
    else if (state.offsetPx < -swipeThreshold) {
      nextSlide();
    }
    else {
      changeSlide(selected);
    }
  }

  const style = createTransformStyle(getPosition(), state.offsetPx, animation ? transitionTime : 0);

  return (
    <Container
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {!noArrows && <Arrow direction="left"
        handleClick={prevSlide}
        arrowPosition={arrowPosition}
        size={arrowSize}
        arrowCss={arrowCss} />}
      {dotsPos === "top" && renderDots()}
      <Slider
        height={height}
        width={width}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <SliderContent
          style={style}
          offset={state.offset}
          slides={(length + 2)}>
          {createSlides()}
        </SliderContent >
      </Slider>
      {dotsPos === "bottom" && renderDots()}
      {!noArrows && <Arrow direction="right"
        size={arrowSize}
        handleClick={nextSlide}
        arrowPosition={arrowPosition}
        arrowCss={arrowCss} />}
    </Container>
  );
}

Carousel.propTypes = {
  arrowPosition: PropTypes.number,
  arrowSize: PropTypes.number,
  transitionTime: PropTypes.number,
  autoPlayTime: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  dotsPos: PropTypes.string,
  renderDot: PropTypes.func,
  noArrows: PropTypes.bool,
  swipeThreshold: PropTypes.number,
}

Carousel.defaultProps = {
  noArrows: false,
  dotsPos: "bottom",
  autoPlayTime: 5,
  swipeThreshold: 50,
}


export default Carousel;
