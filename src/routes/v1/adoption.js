const express = require("express");
const Pet = require("../../models/Pet");
const Request = require("../../models/Request");

const router = express.Router();

// Get all adoption posts
router.get("/adoption", async(req, res) => {
	const adoptions = await Pet.find();
	res.send(adoptions);
})

// Get all adoption requests
router.get("/adoption/requests", async(req, res) => {
	const requests = await Request.find();
	res.send(requests);
})

// Get pet details
router.get("/adoption/details/:id", async(req, res) => {
	const id = req.params.id;
	const adoptionDetails = await Pet.findById(id)
	res.send(adoptionDetails);
})

// Get user specific adoption posts
router.get("/adoption/user/:email", async(req, res) => {
	const email = req.params.email;
	const adoptionPosts = await Pet.find({ email });
	res.send(adoptionPosts)
})

module.exports = router
