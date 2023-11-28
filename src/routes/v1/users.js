const express = require("express");
const User = require("../../models/User");

const router = express.Router();

// Get all users
router.get("/users", async (req, res, next) => {
	const users = await User.find();
	console.log(users);
	res.send(users);
	next();
});

module.exports = router;
