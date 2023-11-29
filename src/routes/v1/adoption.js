const express = require("express");
const Pet = require("../../models/Pet");
const Request = require("../../models/Request");
const verifyToken = require("../../middlewares/verifyToken");
const verifyAdmin = require("../../middlewares/verifyAdmin");

const router = express.Router();

// Get all adoption posts
router.get("/adoption", verifyToken, verifyAdmin, async(req, res) => {
	const filter = {};
	
	const category = req.query.category;
	const sort = req.query.sort || -1;
	
	if(category) filter.pet_category = category;
	
	console.log(filter);
	const adoptions = await Pet.find(filter).sort({ posted_date: sort });
	res.send(adoptions);
})

// Get pet details
router.get("/adoption/details/:id", async(req, res) => {
	const id = req.params.id;
	const adoptionDetails = await Pet.findById(id)
	res.send(adoptionDetails);
})

// Get user specific adoption posts
router.get("/adoption/user", verifyToken, async(req, res) => {
	if(req.query.email !== req.user.email) {
		return res.status(401).send({ message: "unauthorized access" })
	}
	
	const author = req.query.email;
	const adoptionPosts = await Pet.find({ author });
	res.send(adoptionPosts)
})

// Get adoption request for a certain user
router.get("/adoption/requests", verifyToken, async(req, res) => {
	console.log(req.query.email)
	if(req.query.email !== req.user.email) {
		return res.status(401).send({ message: "unauthorized access" })
	}
	
	const author = req.query.email;
	const requests = await Request.find({ author });
	res.send(requests);
})

// Post a pet
router.post("/adoption", verifyToken, async(req, res) => {
	if(req.query.email != req.user.email) {
		return res.status(401).send({ message: "unauthorized access" });
	}
	
	const pet = req.body;
	const result =  await Pet.collection.insertOne(pet);
	res.send(result);
})

// Delete one adoption
router.delete("/adoption/:id", verifyToken, async(req, res) => {
	if(req.query.email !== req.user.email) {
		return res.status(401).send({ message: "unauthorized access" });
	}
	
	const _id = req.params.id;
	const result = await Pet.deleteOne({ _id });
	res.send(result);
})

// Upate one adoption
router.put("/adoption/:id", verifyToken, async(req, res) => {
	// if(req.query.email !== req.user.email) {
	// 	return res.status(401).send({ message: "unauthorized access" });
	// }
	const _id = req.params.id
	const query = { _id }
	const update = { $set: req.body }
	const result = await Pet.updateOne(query, update);
	res.send(result);
})

module.exports = router
