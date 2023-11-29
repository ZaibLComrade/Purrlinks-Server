const express = require("express");
const Pet = require("../../models/Pet");
const Request = require("../../models/Request");
const verifyToken = require("../../middlewares/verifyToken");
const verifyAdmin = require("../../middlewares/verifyAdmin");

const router = express.Router();

// Get all adoption posts
router.get("/adoption", verifyToken, verifyAdmin, async(req, res) => {
	const adoptions = await Pet.find();
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

module.exports = router
