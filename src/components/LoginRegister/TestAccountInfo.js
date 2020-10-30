import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';


const CardStyled = styled(Card)`

background-color: black;
color: white;
align-self: center;
margin-top: 2rem;

`;

export default function TestAccountInfo() {
  return (
    <CardStyled>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Login with TestAccount
        </Typography>
        <Typography variant="body2" component="p">
          Email: user@test.de, password: test
        </Typography>
      </CardContent>
    </CardStyled>
  )
}
