import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';


const Container = styled.div`
align-items: center;
display: flex;
justify-content: center;
height: 50vh;
flex-direction: column;
margin: 2rem;
`;

export default function Four0Four() {
  return (
    <Container>
      <Typography variant="h1" >
        404
      </Typography>
      <Typography variant="h3" >
        Sorry. The Page does not exist.
      </Typography>
    </Container>
  )
}
