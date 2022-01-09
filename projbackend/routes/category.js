const express = require('express');
const app = express.Router();

const {getCategoryById,createCategory,getAllCategories,getCategory,updateCategory,deleteCategory} = require('../controllers/category');
const {isAdmin,isSignedIn,isAuthenticated} = require('../controllers/authenticate');
const {getUserById} = require('../controllers/user');


app.param("userId",getUserById);
app.param("categoryId",getCategoryById);

//create
app.post('/category/create/:userId',isSignedIn,isAuthenticated,isAdmin,createCategory)

//read
app.get('/category/:categoryId',getCategory);
app.get('/categories',getAllCategories)

//update
app.put('/category/:categoryId/:userId',isSignedIn,isAuthenticated,isAdmin,updateCategory);

//delete
app.delete('/category/:categoryId/:userId',isSignedIn,isAuthenticated,isAdmin,deleteCategory);



module.exports = app;