const jwt = require("jsonwebtoken");
const express = require("express");
const userCollection = require("../../models/User");

const router = express.Router();

router.post("/authenticate", async(req, res) => {
	const method = req.query.method;
	const email = req.body.email;
	if(method === "login") {
		const [ role ] = await userCollection.find({ email }, "role -_id");
		console.log(email, role.role);
		const userCred = { email, role: role.role };
		console.log(userCred);
		const token = jwt.sign(userCred, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "8h" });
		
		res.cookie("token", token, {
			httpOnly: true,
			secure: true,
			sameSite: "None",
		}).send({ success: true })
	} else if(method === "logout") {
		res.clearCookie("token", { 
			maxAge: 0,
			httpOnly: true,
			secure: true,
			sameSite: "None",
		}).send({ success: true })
	} else {
		res.send({ success: false })
	}
})

module.exports = router;
