import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import EuroIcon from '@material-ui/icons/Euro';
import React, { useState } from "react";
import styled from 'styled-components';

const InputContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding-bottom: 24px;
font-size: 16px;
}
`;

const Seperator = styled.span`
flex: 0 0 24px;
width: 24px;
height: 1px;
margin: 0 10px;
background: black;
}
`;

const PriceSlider = ({addQuery, onClick, priceRangeInit, min, max}) => {

  const MAX_PRICE = max;
  const MIN_PRICE = min;

  const [priceRange,setPriceRange] = useState(priceRangeInit);

  const handleChangeSlide = (event, newValue) => {
    setPriceRange(newValue);
  }

  const setBack = () => {
    setPriceRange([MIN_PRICE, MAX_PRICE]);
  }

  const setPriceMin = (event) => {
    const reg = /^[0-9\b]+$/;
    let value = event.target.value;
      if (value === '' || reg.test(value)) {
        if (value.charAt(0) === "0" && value.length > 1) {
          value = value.substr(1);
        }
        setPriceRange([Number(value), priceRange[1]]);
      }
  }
  const setPriceMax = (event) => {
    const reg = /^[0-9\b]+$/;
    let value = event.target.value;
      if (value === '' || reg.test(value)) {
        if (value.charAt(0) === "0" && value.length > 1) {
          value = value.substr(1);
        }
        setPriceRange([priceRange[0], Number(value)]);
      }
  }

  const isFilterActive = () => {
    return (priceRange[0] !== MIN_PRICE || priceRange[1] !== MAX_PRICE);
  }

  const hasRangeChanged = () => {
    return (priceRange[0] !== priceRangeInit[0] || priceRange[1] !== priceRangeInit[1]);
  }

  const handleClick = () => {
    addQuery({priceMin: (priceRange[0] !== MIN_PRICE) ? priceRange[0] : undefined,
              priceMax: (priceRange[1] !== MAX_PRICE) ? priceRange[1] : undefined});
    onClick();
  }

  return (
    <Card>
      <CardContent>
      <Typography variant="h5" component="h2">
        Price Range 
      </Typography>
    <Slider
    min={MIN_PRICE}
    max={MAX_PRICE}
    value={priceRange}
    onChange={handleChangeSlide}
    valueLabelDisplay="auto"
    aria-labelledby="range-slider"
  />
  <InputContainer>
  <TextField id="standard-basic" label="Min" value={priceRange[0]} onChange={setPriceMin}
            size="small"
            InputProps={{
              endAdornment: <InputAdornment position="end"><EuroIcon/></InputAdornment>,
              }}
              inputProps={{
                size: 10,
                maxLength: 5
                }}
  />
  <Seperator/>
              <TextField id="standard-basic" label="Max" value={priceRange[1]} onChange={setPriceMax}
              size="small"
              InputProps={{
                endAdornment: <InputAdornment position="end"><EuroIcon/></InputAdornment>,
                }}
                inputProps={{
                  size: 10,
                  maxLength: 5
                  }}/>
  </InputContainer>
  <Button onClick={handleClick} 
          color= "primary"
          disabled= {!hasRangeChanged()}
          variant="contained"
          > Save Change</Button>
  {isFilterActive() &&
  <Button onClick={setBack} 
          color="secondary"
          variant="contained"> Set Back</Button>}
  </CardContent>
  </Card>
  );
}
export default PriceSlider;