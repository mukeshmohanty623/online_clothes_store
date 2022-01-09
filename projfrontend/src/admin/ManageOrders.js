import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getAllOrders } from "./helper/orderhelper";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const ManageOrders = () => {
  const { token, user } = isAuthenticated();
  console.log(user._id);
  const [orders, setOrders] = useState([]);
  const preload = () => {
    getAllOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const card = () => {
    return (
      <div className="card">
        <div className="card-header bg-secondary text-light text-center text-bold">
          ADMIN PANEL
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create Categories
            </Link>
          </li>
          <li class="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">
              Manage Categories
            </Link>
          </li>
          <li class="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Products
            </Link>
          </li>
          <li class="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Products
            </Link>
          </li>
          <li class="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <Base title="Manage Orders" description="manage the custmers orders">
        <h3 className="text-center">Totally {orders.length} Order Placed </h3>
        <div className="row">
          <div className="col-3">{card()}</div>
        </div>
      </Base>
    </div>
  );
};

export default ManageOrders;