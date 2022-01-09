const stripe = require("stripe")(process.env.SECRET_KEY);
const uuid = require("uuid/v4");

exports.makePayment = (req, res) => {
  const { token, products } = req.body;
  let amount = 0;
  products.map((p) => {
    amount = amount + p.price;
  });

  const idempotencyKey = uuid();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      const info = stripe.charges.create(
        {
          amount: amount * 100,
          currency: "INR",
          customer: customer.id,
          receipt_email: token.email,
          description: "a test account",
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              state: token.card.address_state,
            },
          },
        },
        { idempotencyKey }
      ).then((result) => {
        res.status(200).send(result);
        console.log("POST",typeof result);
      })
      .catch((err) => console.log(err));
      
    });
};

exports.getCharges = (req, res) => {
  stripe.charges
    .list({
      limit: 3,
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};
