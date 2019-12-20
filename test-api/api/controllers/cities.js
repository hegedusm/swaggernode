import { Cities } from "../database/mongo/mongoose";


function findAll(req, resp) {
	Cities.find({}, (err, cities) => {
		if (err) resp.sendStatus(500);
		else resp.json(cities);
	});
}

function add(req, resp) {
	const city = req.body;
	new Cities(city).save((err, c) => {
		if (err) resp.sendStatus(500);
		else resp.sendStatus(200);
	});
}

function upsert(req, resp) {
	const id = req.swagger.params.id.value;
	console.log("upserting");
	const city = req.body;
	city.id = id;
	Cities.findOneAndUpdate({ id: id }, city, { upsert: true }, (err, cities) => {
		if (err) resp.sendStatus(500);
		else resp.sendStatus(200);
	});
}

function deleteCity(req, resp) {
	const id = req.swagger.params.id.value;
	Cities.deleteOne({ id: id }, (err, res) => {
		if (err) resp.sendStatus(500);
		else if (res.deletedCount) resp.sendStatus(200);
		else resp.sendStatus(404);
	});
}

module.exports = {
	getCitites: findAll,
	addCity: add,
	deleteCity: deleteCity,
	upsertCity: upsert
};