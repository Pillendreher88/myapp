import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { PriceTag } from '../Utils/PriceTag.js';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Typography, Grid, Divider, useMediaQuery } from '@material-ui/core';
import VisibilitySensor from 'react-visibility-sensor';
import ConditionalWrapper from '../Utils/ConditionalWrapper.js';

const TotalContainer = styled(Grid)`
margin-bottom: 6px;
`;

const Title = styled(Typography)`
margin-bottom: 15px;
`;

const Sticky = styled.div`

position: fixed;
bottom: 0;
right: 0;
left: 0;
background-color: ghostwhite;
padding: 10px;
`;

export default function ({ price, productsPrice, deliveryPrice }) {

  const [isStickyVisible, setStickyVisible] = useState(false);

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {

    setStickyVisible(isSmallScreen);

  }, [isSmallScreen]);

  const onChange = (isVisible) => {

    setStickyVisible(!isVisible);
  }

  return <>
    <Card>
      <CardContent>
        <ConditionalWrapper condition={isSmallScreen} wrap={(children) =>
          <VisibilitySensor onChange={onChange} intervalDelay={200}>{children}</VisibilitySensor>}>
        <Title variant="h4" component="h2">
          Total Cost
        </Title>
        </ConditionalWrapper>
        <TotalContainer container justify="space-between" alignItems="center">
          <Typography variant="subtitle1" component="span">
            Items
          </Typography>
          <PriceTag price={productsPrice} variant="subtitle1" />
        </TotalContainer>
        <TotalContainer container justify="space-between" alignItems="center">
          <Typography variant="subtitle1" component="span">
            Delivery
          </Typography>
          <PriceTag price={deliveryPrice} variant="subtitle1" />
        </TotalContainer>
        <Divider />
        <TotalContainer container justify="space-between" alignItems="center">
          <Typography variant="h6" component="span">
            Total
          </Typography>
          <PriceTag price={price} />
        </TotalContainer>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="checkout"
          fullWidth
        >
          CheckOut
        </Button>
      </CardContent>
    </Card>
    {isStickyVisible &&
      <Sticky >
        <TotalContainer container justify="space-between" alignItems="center">
          <Typography variant="h6" component="span">
            Total
                </Typography>
          <PriceTag price={price} />
        </TotalContainer>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="checkout"
          fullWidth
        >
          CheckOut
              </Button>
      </Sticky>}
  </>
}
