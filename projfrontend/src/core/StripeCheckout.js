import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Stripe from "react-stripe-checkout";
import { API } from "../backend";
import { createCart } from "./helper/orderhelper";
import { emptyCart } from "./helper/carthelper";

const StripeCheckOut = ({
  products,
  reload = undefined,
  setReload = (f) => f,
}) => {
  const [amount, setAmount] = useState(0);
  const{user}= isAuthenticated()
  const tokens = isAuthenticated().token
  const loadFinalPrice = () => {
    let a = 0;
    products.map((p) => {
      a = a + p.price;
    });
    return a;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
      amount,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json()
      }).then((data) => {
        console.log(data);
        const orderData = {
          products : products,
          transaction_id : data.id,
          amount: data.amount / 100,
          address: data.shipping.address
        }
        createCart(user._id,tokens,orderData).then(data=>{
          console.log(data);
        }).catch(err=>{
          console.log(err);
        })
        emptyCart(() => {
          console.log("cart is empties");
        });
        setReload(!reload);
      })
      .catch((err) => console.log(err));
  };

  const stripeButton = () => {
    return isAuthenticated() ? (
      <Stripe
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        token={makePayment}
        amount={loadFinalPrice() * 100}
        name="Buy T-Shirts"
        currency="INR"
        shippingAddress
        billingAddress
      >
        <button className="btn btn-success ">Click to Proceed Payment</button>
      </Stripe>
    ) : (
      <Link to="/signin" className="btn btn-warning ">
        SignIn
      </Link>
    );
  };

  return (
    <div>
      <h1 className="text-white ">
        You have to pay &#8377; {loadFinalPrice()}
      </h1>
      {stripeButton()}
    </div>
  );
};

export default StripeCheckOut;
