const { Schema, model } = require("mongoose");

const donationSchema = new Schema({
	donated_to: String,
	pet_name: String,
	pet_iamge: String,
	contributer_name: String,
	contributer_email: String,
	donated_amount: Number,
})

const Donation = model("Donation", donationSchema);
module.exports = Donation;
