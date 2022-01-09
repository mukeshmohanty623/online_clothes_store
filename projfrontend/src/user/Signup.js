import React, { useState } from "react";
import Base from "../core/Base.js";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper/index.js";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    refcode:"",
    error: "",
    success: false,
  });

  const { name, email, password, error, success,refcode } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password,refcode})
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error, success: false,name: "",
          email: "",
          password: "",
          refcode:""
        });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            refcode:"",
            success: true,
          });
        }
      })
      .catch((err) => {
        if (err) {
          console.log("error in sigup", err);
        }
      });
  };

  const sigupform = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                onChange={handleChange("name")}
                className="form-control"
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">E-mail</label>
              <input
                onChange={handleChange("email")}
                className="form-control"
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Refferal(optional)</label>
              <input
                onChange={handleChange("refcode")}
                className="form-control"
                type="text"
                value={refcode}
              />
            </div>
            <br />
            <div className="text-center">
              <button onClick={onSubmit} className="btn btn-success btn-block">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >New account was created.Please <Link to="/signin">Login Here</Link></div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >{error}</div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signup Page" description="signup page for user to login!">
      {successMessage()}
      {errorMessage()}
      {sigupform()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
