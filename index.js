// Importing modules
const express = require("express");
const connectDB = require("./src/db/connectDB");
const usersRoute = require("./src/routes/v1/users");
const applyMiddlewares = require("./src/middlewares/applyMiddlewares");
const globalErrorHandler = require("./src/utils/config");
const donationCampaigns = require("./src/routes/v1/donationCampaigns");
const adoption = require("./src/routes/v1/adoption");

// Initialization
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
applyMiddlewares(app);
app.use(usersRoute);
app.use(donationCampaigns);
app.use(adoption)

app.get('/health', (req, res) => {
	res.send("Server is running");
})

app.all("/*", (req, res, next) => {
	const error = new Error(`${req.originalUrl} path not found in server`)
	error.status = 404;
	next(error);
})

app.use(globalErrorHandler)

const main = async () => {
	await connectDB();
	app.listen(port, () => {
		console.log("Server is running on port", port);
	})
}; main();

