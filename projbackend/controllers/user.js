const User = require("../models/user.js");
const Cart = require("../models/order.js");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: "No user found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.epassword = undefined;
  req.profile.salt = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: " You are not authenticated",
        });
      }
      user.epassword = undefined;
      user.salt = undefined;
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Cart.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, cart) => {
      if (err) {
        return res.status(400).json({ err: "No order in this account" });
      }

      return res.json(cart);
    });
};


exports.updateRefer =(req,res) =>{
  const reward = req.profile.reward;
  return  res.json({reward : reward});
}

//middlewares
exports.pushOrderInPurchaseArray = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    const { _id, name, description, category, quantity } = product;
    purchases.push({
      _id: _id,
      name: name,
      description: description,
      category: category,
      quantity: quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  //store purchases array in DB
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true, useFindAndModify: false },
    (err, purchases) => {
      if (err) {
        return res.status(400).json({ error: "Not able to save" });
      }
      next();
    }
  );
};

exports.isReffered = (req, res, next) => {
  var referralid = req.body.refcode;
  
  console.log(referralid);
  if(referralid === undefined){
    return  next();
  }
  else if(referralid){
      console.log(referralid);
    User.findById(referralid).exec((err, user) => {
      if (err || !user) {
        
        return res.status(400).json({
          error: "Wrong refferal",
        });
      }
      console.log(user.reward);
      user.reward = user.reward+1;
      console.log(user.reward);
      user.save();
      next();
    });
 }
};


exports.isDuplicateRef = (req,res,next)=>{
  const mail = req.body.email; 
    User.find({email:mail}).exec((err, user) => {
      if (!(Object.keys(user).length === 0)) {
        return res.status(400).json({
          error: "mail already exist",
        });
      }
      next();
    });
}