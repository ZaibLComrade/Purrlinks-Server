// Importing modules
const express = require("express");
const connectDB = require("./src/db/connectDB");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const usersRoute = require("./src/routes/v1/users");
app.use(usersRoute);

app.all("/*", (req, res) => {
	res.send("Server is running");
})

const main = async () => {
	await connectDB();
	app.listen(port, () => {
		console.log("Server is running on port", port);
	})
}; main();

