import React from "react";
import styled from "styled-components";
import { Grid, Typography } from "@material-ui/core";
import { LinkWrap } from "../Utils/Link.js";

const Container = styled(LinkWrap)`
  min-height: 200px;
  cursor: pointer;
  border: 2px solid black;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function IndexPage() {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={2}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Container to="/myaccount/myaddresses">
          <Typography variant="h5">My Addresses</Typography>
        </Container>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Container to="/myaccount/myprofile">
          <Typography variant="h5">My Profile</Typography>
        </Container>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Container to="/myaccount/myorders">
          <Typography variant="h5">My Orders</Typography>
        </Container>
      </Grid>
    </Grid>
  );
}
