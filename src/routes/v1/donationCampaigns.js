const express = require("express");
const DonationCampaign = require("../../models/DonationCampaign");
const verifyToken = require("../../middlewares/verifyToken");
const verifyAdmin = require("../../middlewares/verifyAdmin");

const router = express.Router();

// Get all donation campaigns
router.get("/donation",  async(req, res) => {
	const donationCampaigns = await DonationCampaign.find();
	res.send(donationCampaigns);
})

// Get donation campaign details by id
router.get("/donation/details/:id", async(req, res) => {
	const id = req.params.id;
	const donationDetails = await DonationCampaign.findById(id);
	res.send(donationDetails);
})

// Get user specific donation campaigns
router.get("/donation/user", verifyToken, async(req, res) => {
	if(req.query.email !== req.user.email) {
		return res.status(401).send({ message: "unauthorized access" });
	}
	
	const creator = req.query.email;
	const campaigns = await DonationCampaign.find({ creator });
	res.send(campaigns);
})

// Create a donation campaing
router.post("/donation", verifyToken, async(req, res) => {
	if(req.query.email !== req.user.email) {
		return res.status(401).send({ message: "unauthorized access" });
	}
	
	const newCampaign = req.body;
	const result = await DonationCampaign.collection.insertOne(newCampaign);
	res.send(result);
})

// Update a campaign
router.put("/donation/:id", verifyToken, async(req, res) => {
	if(req.query.email !== req.user.email) {
		return res.status(401).send({ message: "unauthorized access" })
	}
	
	const _id = req.params.id
	const update = req.body;
	console.log(update);
	const result = await DonationCampaign.findByIdAndUpdate(_id, { $set: update })
	console.log(result);
	res.send(result);
})

// Update a campaign (Made to toggle pause/unpause)
router.patch("/pause-donation-campaign/:id", verifyToken, verifyAdmin, async(req, res) => {
	const _id = req.params.id
	const update = { $set: req.body };
	const query = { _id }
	console.log(query, update);
	const result = await DonationCampaign.updateOne(query, update)
	console.log(result)
	res.send(result);
})

// Delete a donation campaign
router.delete("/donation/:id", async(req, res) => {
	const _id = req.params.id;
	const query = { _id }
	console.log(query)
	const result = await DonationCampaign.collection.deleteOne(query);
	console.log(result)
	res.send(result)
}) 

module.exports = router;
