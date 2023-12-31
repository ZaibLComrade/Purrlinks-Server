const verifyAdmin = (req, res, next) => {
	const role = req.user.role;
	if(role !== "admin") {
		return res.status(403).send({ message: "access forbidden" });
	}
	next();
}

module.exports = verifyAdmin;
