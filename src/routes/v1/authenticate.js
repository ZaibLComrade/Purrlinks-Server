const jwt = require("jsonwebtoken");
const express = require("express");
const userCollection = require("../../models/User");

const router = express.Router();

router.post("/authenticate", async(req, res) => {
	const method = req.query.method;
	const userCred = req.body;
	if(method === "login") {
		const role = await userCollection.find(userCred, "role -_id");
		const token = jwt.sign(userCred, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "8h" });
		
		res.cookie(token, {
			httpOnly: true,
			secure: true,
			sameSite: "none",
		}).send({ success: true })
	} else if(method === "logout") {
		res.clearCookie("token", { maxAge: 0 }).send({ success: true })
	} else {
		res.send({ success: false })
	}
})

module.exports = router;
