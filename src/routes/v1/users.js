const express = require("express");
const UserCollection = require("../../models/User");
const findAll = require("../../api/v1/users/controllers/users");

const router = express.Router();

router.get("/users", findAll);

module.exports = router;
