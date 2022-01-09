import React, { useState } from "react";
import { isAuthenticated, updateRefer } from "../auth/helper/index.js";
import Base from "../core/Base.js";

const Referral = () => {
  const { user,token } = isAuthenticated();
  const { _id,name } = user;
  const [reward,setReward] = useState();

  const update = ()=>{
  updateRefer(_id,token)
  .then(data=>{
    setReward(data.reward)
  });
  }
   update();
  
  const LeftSide= ()=>{
        return(
            <div className="card mb-4">
                 <h4 className="card-header text-center">Reward</h4>
                 <ul className="list-group">
            <li className="list-group-item">
                <span className="badge bg-success mr-2">Total Earned:</span> Rs.{reward*10}
            </li>
            <li className="list-group-item">
               <button onClick={update} className="btn btn-outline-primary">Refresh</button>
            </li>
            </ul>
            </div>
        )
    }




  const RightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Share this below code</h4>
        <ul className="list-group">
            <li className="list-group-item">
                <span className="badge bg-success mr-2">Name:</span>{name}
            </li>
            <li className="list-group-item">
                <span className="badge bg-success mr-2">Code:</span> {_id}
            </li>
            <li className="list-group-item">
                <p>Only 3 referral signups are allowed in 24hrs</p>
            </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Referral Page"
      description="Share Referral code to earn rewards"
      className="container  bg-success p-4"
    >
      <div className="row">
          <div className="col-3">{LeftSide()}</div>
          <div className="col-9">{RightSide()}</div>
      </div>
    </Base>
  );
};

export default Referral;
