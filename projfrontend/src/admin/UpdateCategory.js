import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {createCategory, getACategory, updateCategory} from'./helper/adminapicall'

const UpdateCategory = ({match}) => {
 
  const [values, setValues ] = useState({
    name: "",
    error: "",
    success: false,
  });


  const preload = (categoryId)=>{
      getACategory(categoryId).then(data=>{
          if(data.error){
            setValues({...values,error:data.error,success:false})
          }else{
              setValues({...values,name:data.name})
          }
      })
  }

  useEffect(()=>{
        preload(match.params.categoryId);
  },[])

  const { name, error, success } = values;

  const { user, token } = isAuthenticated();
  const handleChange =(event) => {
    setValues({ ...values, error: false, name: event.target.value});
  };

  const onSubmit = (event)=>{
    event.preventDefault();
    setValues({...values,error:false,success:false})
    updateCategory(match.params.categoryId,user._id,token,{name})
    .then(data=>{
        if(data.error){
            setValues({...values,error:data.error,success:false,name:""})
        }else{
            setValues({...values,success : true,name:""});
        }
    })
    .catch(err=>{
        return console.log("something went wrong");
    })
  }


  
  const goback = () => {
    return (
      <div className="mt-5">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Admin home
        </Link>
      </div>
    );
  };

  const successMessage = ()=>{
      if(success){
         return ( <h4 className="text-success">Succefully updated a category</h4>);
      }
  }
  const warningMessage = ()=>{
    if(error){
       return ( <h4 className="text-danger">Failed to create Category</h4>);
    }
}

  const categoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <p className="lead">Enter the category</p>
          <input
            type="text"
            className="form-control my-3"
            onChange = {handleChange}
            autoFocus
            required
            value={name}
            placeholder="For ex. Summer"
          />
          <button className="btn btn-outline-info" onClick={onSubmit} >Update Category</button>
        </div>
      </form>
    );
  };

  return (
    <Base
      title="Update a Category"
      description="Update a new category for new T-shirts"
      className="container  bg-info  p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
         {successMessage()}
         {warningMessage()}
         {categoryForm()} 
         {goback()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategory;