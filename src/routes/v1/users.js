const express = require("express");
const User = require("../../models/User");

const router = express.Router();

// Get all users
router.get("/users", async (req, res) => {
	const users = await User.find();
	res.send(users);
});

// Save user to databse
router.post("/users", async(req, res) => {
	const newUser = req.body;
	const result = User.collection.insertOne(newUser);
	res.send(result);
})

// Update user role to admin
router.patch("/users/make-admin/:email", async(req, res) => {
	const email = req.params.email;
	const makeAdmin = { $set: { role: "admin" } }
	const result = await User.updateOne({ email }, makeAdmin);
	res.send(result)
})

module.exports = router;
