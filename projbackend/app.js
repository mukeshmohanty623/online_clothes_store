 require('dotenv').config();
 const express = require('express');
 const app = express();
 const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authenticateRoute = require('./routes/authenticate.js');
const userRoute = require('./routes/user');
const categoryRoute = require('./routes/category.js');
const productRoute = require('./routes/product.js');
const orderRoute = require('./routes/order.js');
const stripeRoute=require('./routes/stripepayement.js');



 const port = process.env.PORT || 3000


 mongoose.connect(process.env.DATABASE, 
 {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true})
 .then(()=>{
    console.log("DB Connected");
 })
 .catch(()=>{
     console.log("Somtehing went error");
 })



app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


app.use("/api",authenticateRoute);
app.use("/api",userRoute);
app.use("/api",categoryRoute);
app.use("/api",productRoute);
app.use("/api",orderRoute);
app.use("/api",stripeRoute);




 app.listen(port,()=>{
     console.log(`Yay I am listening at ${port}`);
 });