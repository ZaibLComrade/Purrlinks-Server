const { Schema, model } = require("mongoose");

const requestSchema = new Schema({
	pet_name: String,
	full_name: String,
	email: String,
	user_location: String,
	phone: String,
})

const Request = model("Request", requestSchema);
module.exports = Request;
