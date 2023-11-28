const express = require("express");
const User = require("../../models/User");

const router = express.Router();

// Get all users
router.get("/users", async (req, res, next) => {
	const users = await User.find();
	res.send(users);
});

// Update user role to admin
router.patch("/users/make-admin/:email", async(req, res) => {
	const email = req.params.email;
	const makeAdmin = { $set: { role: "admin" } }
	const result = await User.findOneAndUpdate({ email }, makeAdmin);
	if(result) res.send({ success: true })
	else res.send({ success: false })
})

module.exports = router;
