const User = require("../../models/User");

const findAllUsers = async() => {
	const users = await User.find();
	return users;
}

module.exports = findAllUsers;
