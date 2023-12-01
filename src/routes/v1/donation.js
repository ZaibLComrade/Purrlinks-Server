const express = require("express");
const Donation = require("../../models/Donation");
const verifyToken = require("../../middlewares/applyMiddlewares");

const router = express.Router();


// Get donations
router.get("/contribution",  async(req, res) => {
	const email = req.query.email
	// if(email != req.user.email) {
	// 	return res.status(401).send({ message: "unauthorized access" });
	// }
	const query = { contributer_email: email }
	const donations = await Donation.find(query);
	res.send(donations);
})

// Get contributers for a specific campaign
router.get("/contribution/:campaign_id", async(req, res) => {
	const campaign_id = req.params.campaign_id;
	const filterCampaign = { donated_to: campaign_id };
	const contributors = await Donation.find(filterCampaign);
	res.send(contributors)
})

// Make a donation
router.post("/contribution", async(req, res) => {
	const donation = req.body;
	const result = await Donation.collection.insertOne(donation);
	res.send(result);
})

// Delete donation
router.delete("/contribution/:id", async(req, res) => {
	const _id = req.params.id;
	const filter = { _id };
	const result = await Donation.deleteOne(filter);
	console.log(result);
})

module.exports = router;
