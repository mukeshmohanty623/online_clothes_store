
const { json } = require('body-parser');
const { check, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
const User = require('../models/user');

exports.signout = (req,res)=>{

    res.clearCookie("token");
    res.send("you logged out");
}






exports.signup = (req,res)=>{
const errors = validationResult(req);
if(!errors.isEmpty()){
    return res.status(422).json({
        error : errors.array()[0].msg
    })
}


   const user= new User(req.body);
   user.save((err,user)=>{
       if(err){
           if(err.keyPattern.email === 1){
               return res.status(400).json({
                   error : "email is already exist"
               })
           }
           return res.status(400).json({
            error : "Somethig went wrong not able to save"
        })
       }
       res.json({
           name : user.name,
           email: user.email,
           id: user._id
       });
   })
}


exports.signin = (req,res)=>{

    const {email,password} = req.body;

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        })
    }
    
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error : "email doesn't exist" 
            })
        }

        if(!user.authenticate(password)){
            return res.status(401).json({
                error : " email and password doesn't match"
            })
        }

        //create token
        const token = jwt.sign({_id:user._id},process.env.SECRET);

        //put token in cookie
        res.cookie("token",token,{expire : new Date() + 9999});

        //send to frontend
        const{_id,name,email,role,reward} = user ;
         return res.status(200).json({
             token,user : {_id,name,email,role,reward}
         })

    })

}



//procted route middleware
exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    userProperty : "auth"

});


//custom middlewares
exports.isAuthenticated = (req,res,next)=>{
    const checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
        return res.status(403).json({
            message : "Not authenticated"
        });
    }
    next();
}





exports.isAdmin = (req,res,next)=>{
    if(req.profile.role === 0){
        return res.status(403).json({
            message : "Not an admin"
        });
    }
    next();
}