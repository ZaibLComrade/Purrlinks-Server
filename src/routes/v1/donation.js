const express = require("express");
const Donation = require("../../models/Donation");

const router = express.Router();

router.post("/contribution", async(req, res) => {
	const donation = req.body;
	const result = await Donation.collection.insertOne(donation);
	res.send(result);
})

module.exports = router;
