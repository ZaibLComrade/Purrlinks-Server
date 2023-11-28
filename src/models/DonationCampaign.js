const { model, Schema } = require("mongoose");

const donationCampaignSchema = new Schema({
	creator: String,
	pet_name: String, 
	pet_image: String,
	max_donation_amount: Number,
	donated_amount: Number,
	short_description: String,
	long_description: String,
})

const DonationCampaign = model("DonationCampaign", donationCampaignSchema);
module.exports = DonationCampaign;
