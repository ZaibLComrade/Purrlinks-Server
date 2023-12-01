const mongoose = require("mongoose");
require("dotenv").config();

const getURI = () => {
	let uri = process.env.DATABASE_URI_PROD;
	if(process.env.NODE_ENV === "development") {
		uri = process.env.DATABASE_URI_LOCAL;
	}
	uri = uri.replace("<username>", process.env.DATABASE_USERNAME);
	uri = uri.replace("<password>", process.env.DATABASE_PASSWORD);
	return uri;
}

const connectDB = async () => {
	console.log("Connecting to Database...");
	await mongoose.connect(getURI(), { dbName: process.env.DATABASE_NAME });
	console.log("Database Connected")
}

module.exports = connectDB;
