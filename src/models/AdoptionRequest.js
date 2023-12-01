const { model, Schema } = require("mongoose");

const adoptionRequestSchema = new Schema({
	full_name: String,
	pet_name: String,
	email: String,
	user_location: String,
	phone: String,
})

const AdoptionRequest = model("AdoptionRequest", adoptionRequestSchema);
module.exports = AdoptionRequest;
