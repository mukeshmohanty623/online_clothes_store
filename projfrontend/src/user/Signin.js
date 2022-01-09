import React, {useState } from 'react';
import Base from '../core/Base.js';
import {Redirect} from 'react-router-dom';
import { authenticate, isAuthenticated, signin } from '../auth/helper/index.js';

const Signin = ()=>{

const [values,setValues]=useState({
  email : "",
  password : "",
  error : "",
  loading:false,
  didRedirect : false
});

const {email,password,error,loading,didRedirect} = values;
const {user} = isAuthenticated();

const handleChange = (name) => (event) => {
  setValues({ ...values, error: false, [name]: event.target.value});
};

const onSubmit = (event)=>{
  event.preventDefault();
  setValues({...values,error:false,loading:true})
  signin({email,password})
  .then(data=>{
    if(data.error){
      setValues({...values,error:data.error,email:"",password:"",loading:false})
    }else{
      authenticate(data,()=>{
        setValues({...values,email:"",password:"", didRedirect : true});
      })
    }
  })
  .catch(console.log("not able to sign in"));
}


 const signInForm = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <form>
                <div className="form-group">
                  <label className="text-light">Email</label>
                  <input value={email} onChange={handleChange("email")} className="form-control" type="email" />
                </div>
    
                <div className="form-group">
                  <label className="text-light">Password</label>
                  <input value={password} onChange={handleChange("password")} className="form-control" type="password" />
                </div>
                <br/>
                <div className="text-center">
                <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                </div>
              </form>
            </div>
          </div>
        );
      };

  const loadingMessage =()=>{
      return (loading && (<div className="alert alert-info">
                              <h2>Loading...</h2>
                          </div>)
      
      )
  }
    
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

 const performRedirect = ()=>{
   if(didRedirect){
     if(user && user.role===1){
       return <Redirect to="/admin/dashboard" />;
     }else{
      return <Redirect to="/user/dashboard" />;
     }
   }
   if (isAuthenticated()) {
    return <Redirect to="/" />;
  }

  }
    

    return (
        <Base title ="Signin Page" description="signin page for user to login!">
           {loadingMessage()}
           {errorMessage()}
           {signInForm()}
           {performRedirect()}
           <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
}

export default Signin;