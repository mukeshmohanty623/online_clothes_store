const { Order, ProductCart } = require("../models/order.js");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Order not found in DB",
        });
      }

      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile._id;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({ err: "Not able to save the order in DB" });
    }
    res.json(order);
  });
};

exports.getAllorders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({ err: "Orders not found in DB" });
      }
      res.json(orders);
    });
};

exports.getorderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.updateMany(
    { _id: req.order._Id },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({ err: "Cannot update Order Status" });
      }
      res.json(order);
    }
  );
};
