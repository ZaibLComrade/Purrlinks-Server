const express = require("express");
const User = require("../../models/User");
const verifyToken = require("../../middlewares/verifyToken")
const verifyAdmin = require("../../middlewares/verifyAdmin");

const router = express.Router();

// Get all users
router.get("/users",verifyToken, verifyAdmin, async (req, res) => {
	const users = await User.find();
	res.send(users);
});

// Get a specific user
router.get("/user", verifyToken, async(req, res) => {
	const email = req.query.email
	if(email !== req.user.email) {
		cosnole.log("ran")
		return res.status(401).send({ message: "unauthorized access" });
	}
	
	const user = await User.findOne({ email });
	res.send(user);
})

// Save user to databse
router.post("/users", async(req, res) => {
	const newUser = req.body;
	const result = await User.collection.insertOne(newUser);
	res.send(result);
})

// Update or insert user to database
router.put("/users/:email", async(req, res) => {
	const email = req.params.email;
	const update = req.body;
	const query = { email };
	const result = await User.collection.updateOne(query, { $set: update }, { upsert: true });
	res.send(result);
})

// Update user role to admin
router.patch("/users/:id", async(req, res) => {
	const _id = req.params.id;
	const update = req.body;
	const query = { _id }
	const result = await User.updateOne(query, { $set: update });
	console.log(result);
	res.send(result)
})

module.exports = router;
