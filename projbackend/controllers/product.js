const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { check, validationResult } = require('express-validator');

//param
exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
};

//routes
exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //destructure the fields
    const { name, description, price, category, stock } = fields;

        if (!name || !description || !price || !category || !stock) {
          return res.status(400).json({
            error: "Please include all fields"
          });
        }
   

    let product = new Product(fields);
    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving tshirt in DB failed"
        });
      }
      res.json(product);
    });
  });
}


exports.getProduct = (req,res)=>{
  req.product.photo = undefined ;
  res.status(400).send(req.product);
}

exports.deleteProduct =(req,res)=>{
  let product = req.product;
  product.remove((err,deletedProduct)=>{
      if(err){
        return res.status(400).json({
          error : "Failed to delete"
        })
      }
      res.json({message : deletedProduct})
  })
}

exports.updateProduct =(req,res)=>{
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  
  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    
   //updationcode using lodash
    let product = req.product;
    product = _.extend(product,fields);
    
    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Updation of the product is failed"
        });
      }
      res.json(product);
    });
  });

}

//productlisting
exports.getAllproducts =(req,res)=>{
  let limit = parseInt(req.query.limit) || 8
  let sortBy = req.query.sortBy || "_id"
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy,"ascending"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
          return res.status(400).json({err: "no Product found"});
        }
        res.json(products)
  })
}


exports.getAllUniqueCategories =(req,res)=>{
  Product.distinct("category",{},(err,category)=>{
    if(err){
      return res.status(400).json({err:"No category Found"});
    }
    res.json(category);
  })
}


//middleware
exports.photo = (req,res,next)=>{
  if(req.product.photo.data){
      res.set("Content-Type",req.product.photo.contentType);
      return res.send(req.product.photo.data);
  }
  next();
}

exports.updateStocks = (req,res,next)=>{
  let myOperations = req.body.order.products.map((product)=>{
    return {
      updateOne :{
        filter : {_id : product._id},
        update : {$inc : {stock : -product.count, sold : +product.count}}
      }
    }
  })

  Product.bulkWrite(myOperations,{},(err,product)=>{
    if(err){
      res.json({error : "Bulk oprration not able to done"})
    }
    next();
  })
}