const { model, Schema } = require("mongoose");

const petSchema = new Schema({
	pet_image: String,
	pet_name: String,
	pet_age: Number,
	pet_category: String,
	pet_location: String,
	short_description: String,
	long_description: String,
	posted_date: String,
	adopted: Boolean,
	author: String
})

const Pet = model("Pet", petSchema);
module.exports = Pet;
