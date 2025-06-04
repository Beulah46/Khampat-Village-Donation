const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/create-subscription', async (req, res) => {
  const { email, name, phone, address } = req.body;

  console.log("New Donor Info:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Phone:", phone);
  console.log("Address:", address);

  // Here you could add code to save to a database or email service

  const customer = await stripe.customers.create({
    email,
    name,
    phone,
    address: {
      line1: address
    }
  });

  const setupIntent = await stripe.setupIntents.create({
    customer: customer.id,
  });

  res.send({ clientSecret: setupIntent.client_secret });
});

  const customer = await stripe.customers.create({ email });
  const setupIntent = await stripe.setupIntents.create({ customer: customer.id });
  res.send({ clientSecret: setupIntent.client_secret });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
