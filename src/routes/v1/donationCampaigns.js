const express = require("express");
const DonationCampaign = require("../../models/DonationCampaign");

const router = express.Router();

// Get all donation campaigns
router.get("/donation", async(req, res) => {
	const donationCampaigns = await DonationCampaign.find();
	res.send(donationCampaigns);
})

module.exports = router;
