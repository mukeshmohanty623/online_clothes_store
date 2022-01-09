const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productCartSchema = new mongoose.Schema({

    product : {
        type : ObjectId,
        ref : "Product"
    },
    quantity: Number,
    name : String,
    price : Number

});

const ProductCart = mongoose.model("ProductCart",productCartSchema);

const orderSchema = new mongoose.Schema({
    products : [productCartSchema],
    transaction_id :{},
    amount :{type:Number},
    address :{
        type:Object
    },
    updated : Date,
    status : {
        type : String,
        default : "Processing",
        enum : ["Delivered","Cancelled","Shipped","Processing","Received"]
    },
    user :{
        type : ObjectId,
        ref : "User"
    }

},{timestamps : true});

const Order = mongoose.model("Order",orderSchema);

module.exports = {Order,ProductCart};