const express = require('express');
const app   = express.Router();

const {getUserById,getUser,updateUser,userPurchaseList,updateRefer} = require('../controllers/user.js');
const {isSignedIn,isAuthenticated} = require('../controllers/authenticate');

app.param("userId",getUserById);

app.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
app.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);
app.get("/cart/user/:userId",isSignedIn,isAuthenticated,userPurchaseList);
app.get("/user/refer/:userId",isSignedIn,isAuthenticated,updateRefer)

module.exports = app;