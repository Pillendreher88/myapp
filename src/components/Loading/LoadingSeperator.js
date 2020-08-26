import React from 'react'
import Line from './LoadingLine';
import {LoadingCircle} from './LoadingSpinner.js';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components'

const Count = styled(Typography)`
padding: 8px;
`;

const Seperator = styled.div`
display: flex;
width: 100%;
align-items: center;
margin-bottom: 24px;
font-size: 16px;
`;


export default function LoadingSeperator({isLoading, text}) {

  return (
    <Seperator>
      <Line  loading = {isLoading} direction = "right"/>
        {isLoading ? <LoadingCircle/> : <Count  variant="h6" component="span">{text}</Count>}
      <Line  loading = {isLoading} direction = "left"/>
    </Seperator>
  );
}
