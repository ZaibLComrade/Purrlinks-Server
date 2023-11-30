require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");

const router = express.Router();

router.post("/payment/create-intent", async(req, res) => {
	console.log(req);
	const { donation } = req.body;
	const amount = parseInt(donation * 100);
	const { client_secret } = await stripe.paymentIntents.create({
		amount: amount,
		currency: "usd",
		payment_method_types: ["card"],
	})
	
	res.send({ clientSecret: client_secret })
}) 

module.exports = router;
