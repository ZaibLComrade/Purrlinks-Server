const express = require("express");
const DonationCampaign = require("../../models/DonationCampaign");
const verifyToken = require("../../middlewares/verifyToken");
const verifyAdmin = require("../../middlewares/verifyAdmin");

const router = express.Router();

// Get all donation campaigns
router.get("/donation", verifyToken, verifyAdmin, async(req, res) => {
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
router.get("/donation/user", verifyToken, async(req, res) => {
	if(req.query.email !== req.user.email) {
		return res.status(401).send({ message: "unauthorized access" });
	}
	
	const creator = req.query.email;
	const campaigns = await DonationCampaign.find({ creator });
	res.send(campaigns);
})

module.exports = router;
