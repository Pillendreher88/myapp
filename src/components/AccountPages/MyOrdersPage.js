import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchOrders } from "../../actions";
import OrderItem from "./OrderItem";

const HeaderOrder = styled(Grid)`
  border-bottom: 1px solid black;
  background-color: #edf0f5;
`;

const BodyOrder = styled(Grid)`
  padding-top: 2rem;
`;

const ContainerOrder = styled.div`
  padding: 1rem;
  border: 1px solid black;
  border-radius: 5px;
  margin-bottom: 3rem;
`;

const DateDisplay = ({ time, options }) => {
  const date = new Date(time);
  return (
    <>
      <Typography variant="h6">Order date</Typography>
      <Typography component="div" variant="body1">
        {date.toLocaleDateString("en-US", options)}
      </Typography>
    </>
  );
};

const PriceDisplay = ({ amount }) => {
  return (
    <>
      <Typography component="div" variant="h6">
        Total price
      </Typography>
      <Typography component="div" variant="body1">
        {amount / 100 + " \u20ac"}
      </Typography>
    </>
  );
};

const MyOrdersPage = ({ orders }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  console.log(orders);

  return (
    <div>
      {orders.length > 0 &&
        orders.map((order) => (
          <ContainerOrder>
            <HeaderOrder container>
              <Grid item xs={6} md={3}>
                <PriceDisplay amount={order.amount} />
              </Grid>
              <Grid item xs={6} md={3}>
                <DateDisplay
                  time={order.created * 1000}
                  options={{
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }}
                />
              </Grid>
            </HeaderOrder>
            <BodyOrder container spacing={3}>
              {order.metadata.products &&
                JSON.parse(order.metadata.products).map((product) => (
                  <Grid item xs={6} md={3}>
                    <OrderItem id={product.id} />
                  </Grid>
                ))}
            </BodyOrder>
          </ContainerOrder>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

export default connect(mapStateToProps)(MyOrdersPage);
