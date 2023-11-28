const express = require("express");
const DonationCampaign = require("../../models/DonationCampaign");

const router = express.Router();

// Get all donation campaigns
router.get("/donation", async(req, res) => {
	const donationCampaigns = await DonationCampaign.find();
	res.send(donationCampaigns);
})

// Get all donation campaign details
router.get("/donation/details/:id", async(req, res) => {
	const id = req.params.id;
	const donationDetails = await DonationCampaign.findById(id);
	res.send(donationDetails);
})

// Get user specific donation campaigns
router.get("/donation/user/:creator", async(req, res) => {
	const creator = req.params.creator;
	const campaigns = await DonationCampaign.find({ creator });
	res.send(campaigns);
})

module.exports = router;
