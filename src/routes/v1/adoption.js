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

module.exports = router
