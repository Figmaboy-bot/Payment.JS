// server.js
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors'); // Import the cors middleware
app.use(express.json());
app.use(cors({ origin: 'https://lapis-0c3faf.webflow.io' })); // Enable CORS for the specific Webflow origin

app.post('/create-checkout-session', async (req, res) => {
  const { amount, email, metadata } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: 'Limo Booking' },
          unit_amount: Math.round(amount * 100), // amount in cents
        },
        quantity: 1,
      }],
      customer_email: email,
      metadata,
      success_url: 'https://lapis-0c3faf.webflow.io/,
      cancel_url: 'https://lapis-0c3faf.webflow.io/,
    });
    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4242, () => console.log('Running on port 4242'));
