const express = require("express");
const Pet = require("../../models/Pet");
const Request = require("../../models/Request");
const verifyToken = require("../../middlewares/verifyToken");
const verifyAdmin = require("../../middlewares/verifyAdmin");

const router = express.Router();

// Get all unadopted adoption posts
router.get("/adoption", async(req, res) => {
	const initFilter = {};
	
	const category = req.query.category;
	const adopted  = req.query?.adopted;
	const searchQuery = req.query?.search;
	const sort = req.query.sort || -1;
	
	if(category) initFilter.pet_category = category;
	if(adopted) initFilter.adopted = ( adopted === 'true' ) ? true : false;
	if(searchQuery) initFilter.pet_name = searchQuery; // Seach by name
	
	const filterArray = Object.entries(initFilter).map(([key, value]) => {
		return (typeof value === 'string') 
			? { [key]: new RegExp(value, 'i') } 
			: { [key]: value }
	})
	const filter = { $and: [ ...filterArray ] };
	
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

// Get adoption request for a certain adoption post
router.get("/adoption/requests", verifyToken, async(req, res) => {
	if(req.query.email !== req.user.email) {
		return res.status(401).send({ message: "unauthorized access" })
	}
	
	const author = req.query.email;
	const requests = await Request.find({ author });
	res.send(requests);
})

// Accept Request
router.patch("/adoption/requests/:id", verifyToken, async(req, res) => {
	if(req.query.email !== req.user.email) {
		return res.status(401).send({ message: "unauthorized access" });
	}
	
	const _id = req.params.id;
	console.log(_id);
	const accepted = req.body;
	const update = { $set: accepted };
	
	const result = await Pet.findByIdAndUpdate( _id, update )
	const acknowledged = result ? true : false;
	console.log(update, acknowledged, result);
	res.send({ acknowledged });
})

// Delete (reject) request
router.delete("/adoption/requests/:id", verifyToken, async(req, res) => {
	if(req.query.email !== req.user.email) {
		return res.status(401).send({ message: "unauthorized access" });
	}
	
	const _id = req.params.id;
	const filter = { _id }
	const result = await Request.deleteOne(filter);
	res.send(result);
}) 

// Post an adoption request
router.post("/adoption/requests", async(req, res) => {
	const request = req.body;
	const result = await Request.collection.insertOne(request);
	res.send(result);
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
router.delete("/adoption/:id", verifyToken, verifyAdmin, async(req, res) => {

	
	const _id = req.params.id;
	const result = await Pet.deleteOne({ _id });
	res.send(result);
})

// Upate one adoption
router.put("/adoption/:id", verifyToken, async(req, res) => {
	if(req.query.email !== req.user.email) {
		return res.status(401).send({ message: "unauthorized access" });
	}
	const _id = req.params.id
	const query = { _id }
	const update = { $set: req.body }
	const result = await Pet.updateOne(query, update);
	res.send(result);
})

// Made endpoint to handle adoption status toggle
router.patch("/adoption/:id", verifyToken, verifyAdmin, async(req, res) => {
	const _id = req.params.id;
	const query = { _id };
	const update = { $set: req.body };
	const result = await Pet.updateOne( query, update );
	res.send(result);
})

module.exports = router
