require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");

const router = express.Router();

router.post("/payment/create-intent", async(req, res) => {
	const { donation } = req.body;
	const amount = donation * 100;
	const { clientSecret } = stripe.paymentIntents.create({
		amount,
		currency: "usd",
		payment_method_types: ["card"],
	})
	
	res.send({ clientSecret })
}) 
