const express = require('express');
const app = express.Router();
const {makePayment,getCharges} = require('../controllers/stripepayment.js')

app.post("/stripepayment",makePayment)
app.get("/getcharges",getCharges)

module.exports = app;