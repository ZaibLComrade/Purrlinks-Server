const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const applyMiddlewares = (app) => {
	app.use(cors({
		origin: [
			process.env.CLIENT,
			process.env.LOCAL_CLIENT
		],
		credentials: true
	}))
	app.use(express.json())
	app.use(cookieParser())
}

module.exports = applyMiddlewares
