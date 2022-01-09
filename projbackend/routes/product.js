const express = require("express");
const app = express.Router();
const { check, validationResult } = require('express-validator');
const {getUserById} = require('../controllers/user.js');
const {isAdmin,isSignedIn,isAuthenticated} = require('../controllers/authenticate');
const {getProductById,createProduct,getProduct,photo,updateProduct,deleteProduct,getAllproducts,getAllUniqueCategories} = require('../controllers/product.js');


app.param("userId",getUserById);
app.param("productId",getProductById);


app.post("/product/create/:userId",isSignedIn,isAuthenticated,isAdmin,createProduct);
app.get("/product/:productId",getProduct);
app.get("/product/photo/:productId",photo);

app.put("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,updateProduct)

app.delete("/product/:productId/:userId",isSignedIn,isAuthenticated,isAdmin,deleteProduct)


//listing
app.get("/products",getAllproducts)
app.get("/products/categories",getAllUniqueCategories)


module.exports = app;
