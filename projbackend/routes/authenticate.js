const express = require('express');
const app = express.Router();
const {signout,signup,signin,isSignedIn} = require('../controllers/authenticate.js') ;
const { check, validationResult } = require('express-validator');
const {isReffered,isDuplicateRef} = require('../controllers/user.js')
app.get('/signout',signout);
app.post('/signup',[
    check("name").isLength({min:5}).withMessage("name should be atleast 5 character"),
    check("email").isEmail().withMessage("email is required"),
    check("password").isLength({min:5}).withMessage("password should be atleast 5 char")
],isDuplicateRef,isReffered,signup);

app.post('/signin',[
    check("email").isEmail().withMessage("email is required"),
    check("password").isLength({min:1}).withMessage("password field is required")
],signin);

app.get('/testroute',isSignedIn,(req,res)=>{
    res.json(req.auth);
})


module.exports = app;