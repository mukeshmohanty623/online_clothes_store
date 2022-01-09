import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend.js";
import Base from "./Base";
import Card from "../reusable component/Card";
import { getAllProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadProducts = () => {
    getAllProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Base title="My Home Page" description="Live as you want">
      <div className="row">
        {products.map((product, index) => {
          return (
            <div className="col-4 text-center mb-4">
              <Card key={index} product={product}/>
            </div>
          );
        })}
      </div>
    </Base>
  );
};

export default Home;
