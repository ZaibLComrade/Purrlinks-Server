const { model, Schema } = require("mongoose");

const userSchema = new Schema({
	full_name: String,
	email: String,
	profile_picture: String,
	role: String
})

const User = model("User", userSchema);

module.exports = User;
