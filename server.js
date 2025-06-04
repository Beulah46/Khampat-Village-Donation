const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/create-subscription', async (req, res) => {
  const { email } = req.body;
  const customer = await stripe.customers.create({ email });
  const setupIntent = await stripe.setupIntents.create({ customer: customer.id });
  res.send({ clientSecret: setupIntent.client_secret });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
body: JSON.stringify({ 
  email: document.getElementById('email').value,
  name: document.getElementById('name').value,
  phone: document.getElementById('phone').value,
  address: document.getElementById('address').value
}),
