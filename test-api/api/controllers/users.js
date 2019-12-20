import { Users } from "../database/mongo/mongoose";

function list (req, resp) {
	Users.find({}, (err, users) => {
		if (err) resp.sendStatus(500);
		else resp.json(users);
	});
}

function deleteUser(req, resp) {
	const userName = req.swagger.params.userName.value;
	Users.deleteOne({ userName: userName }, (err, res) => {
		if (err) resp.sendStatus(500);
		else if (res.deletedCount) resp.sendStatus(200);
		else resp.sendStatus(404);
	});
}

module.exports = {
	getUsers: list,
	deleteUser: deleteUser
};