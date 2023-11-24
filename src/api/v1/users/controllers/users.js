const findAllUsers = require("../../../../lib/users/findAllUsers");

const findAll = async (req, res) => {
	const users = await findAllUsers();
	res.send(users);
}

module.exports = findAll;
