import React, { useState, useEffect} from "react";
import "../styles.css";

import Base from "./Base";
import Card from "../reusable component/Card";

import { loadCart } from "./helper/carthelper";
import StripeCheckOut from "./StripeCheckout";


const Cart = () => {
  const [products, setProducts] = useState([]);
    const [reload,setReload] =useState(1);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);
  const loadAllProducts = () => {
    return (
      <div>
        <h2>Total {products.length} Products in Cart</h2>
        {products.map((product, index) => {
          return(<Card
            key={index}
            product={product}
            addToCart={false}
            removeFromCart={true}
            setReload = {setReload}
            reload = {reload}
          />);
        })}
      </div>
    );
  };

  const loadCheckOut = () => {
    return products.length === 0 ? 
     ( <div>
        <h2>Please add something to the cart</h2>
      </div>
    ) : (<StripeCheckOut products={products} setReload={setReload} reload = {reload} />)
  };

  return (
    <Base title="Cart Page" description="Live as you want">
      <div className="row">
        <div className="col-6 text-center">{loadAllProducts()}</div>
        <div className="col-6 text-center">{loadCheckOut()}</div>
      </div>
    </Base>
  );
};

export default Cart;
