import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link, Redirect, withRouter } from "react-router-dom";
import { createProduct, getCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const AddProduct = ({ history }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    error: "",
    loading: false,
    createdProduct: "",
    getaRedirect: false,
    categories: [],
    category: "",
    formData: "",
  });

  const { user, token } = isAuthenticated();

  const {
    name,
    description,
    price,
    stock,
    createdProduct,
    getaRedirect,
    formData,
    loading,
    error,
    photo,
    categories,
    category,
  } = values;

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({ ...values, categories: data, formData: new FormData() });
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);
  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const backToHome = (history) => {
    if (getaRedirect) {
      setTimeout(() => {
        history.push("/admin/dashboard");
      }, 2000);
    }
  };

  const redirect = () => {
    console.log("hiii");
    return <Redirect to="" />;
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="row">
          <div className="col-md-6 offset-sm-3 text-left mt-2">
            <div className="alert alert-info">Loading ...</div>
          </div>
        </div>
      )
    );
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true, getaRedirect: false });
    createProduct(user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, getaRedirect: false });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            getaRedirect: true,
            loading: false,
            error: "",
            createdProduct: data.name,
          });
          backToHome();
        }
      })
      .catch();
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct} created successfully</h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{ display: error ? "" : "none" }}
      >
        <h4>{error}</h4>
      </div>
    );
  };

  const createProductForm = () => (
    <form>
      <span className="m-2">Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success m-2">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control m-2"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control m-2"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control m-2"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control m-2"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => {
              return (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control m-2"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success m-2"
      >
        Create Product
      </button>
    </form>
  );

  return (
    <Base
      title="Product Page"
      description="Add a product"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2 ">
          {loadingMessage()}
          {errorMessage()}
          {successMessage()}
          {backToHome(history)}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default withRouter(AddProduct);
