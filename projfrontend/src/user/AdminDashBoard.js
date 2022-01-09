import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index.js";
import Base from "../core/Base.js";


const AdminDashBoard = () => {

    const {name,email} = isAuthenticated().user; // This line can bw written as 
                                    //"const {user:{name,email,role}} = isAuthentcated()"
    

  const adminLeftSide = () => {
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

  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
            <li className="list-group-item">
                <span className="badge bg-success mr-2">Name:</span> {name}
            </li>
            <li className="list-group-item">
                <span className="badge bg-success mr-2">Email:</span> {email}
            </li>
            <li className="list-group-item">
                <span className="badge bg-danger mr-2">Admin Area</span>
            </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="AdminDashBoard"
      description="Mangae your shop"
      className="conatainer bg-success p-5"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
