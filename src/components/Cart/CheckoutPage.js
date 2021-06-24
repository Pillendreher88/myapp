import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./Checkout";

const promise = loadStripe(
  "pk_test_51J2ZFBKW8F5HRxmbzQp2kKNXF1y0DqO9h3bR8nVaNFvsOl1I63zl75DpBpLlxv9C6iB8n5WTjKKATwYo3hlw8LpR00em6RluVa"
);

export default function CheckoutPage() {
  return (
    <Elements stripe={promise}>
      <CheckoutForm />
    </Elements>
  );
}
