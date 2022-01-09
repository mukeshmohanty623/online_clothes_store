const express = require('express');
const app = express.Router();

const {isAdmin,isAuthenticated,isSignedIn} = require('../controllers/authenticate.js');
const {getUserById,pushOrderInPurchaseArray} = require('../controllers/user.js');
const {updateStocks} = require('../controllers/product.js');
const {getOrderById,createOrder,getAllorders,getorderStatus,updateStatus} = require('../controllers/order.js');

//parames
app.param("userId",getUserById);
app.param("orderId",getOrderById);

//create
app.post("/order/create/:userId",isSignedIn,isAuthenticated,pushOrderInPurchaseArray,updateStocks,createOrder)

//read
app.get("/order/all/:userId",isSignedIn,isAuthenticated,isAdmin,getAllorders);


//order status
app.get("/order/status/:userId",isSignedIn,isAuthenticated,isAdmin,getorderStatus)
app.put("/order/:orderId/status/:userId",isSignedIn,isAuthenticated,isAdmin,updateStatus)


module.exports = app;