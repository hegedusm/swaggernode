'use strict';

import { Products } from "../database/mongo/mongoose";

let lastId = 1;

function list(req, resp) {
	Products.find({}, (err, products) => {
		if (err) resp.sendStatus(500);
		else resp.json(products);
	});
}

function get(req, resp) {
	const productId = req.swagger.params.id.value;
	Products.findOne({ id: productId }, (err, product) => {
		if (err) resp.sendStatus(500);
		if (product) resp.json(product);
		else resp.sendStatus(404);
	});
}

function getReviews(req, resp) {
	const productId = req.swagger.params.id.value;
	Products.findOne({ id: productId }, (err, product) => {
		if (err) resp.sendStatus(500);
		if (product) resp.json(product.reviews);
		else resp.sendStatus(404);
	});
}

function addProduct(req, resp) {
	const product = req.body;
	product.id = ++lastId;
	new Products(product).save(product, (err, p) => {
		if (err) resp.sendStatus(500);
		else resp.sendStatus(200);
	});
}

function deleteProduct(req, resp) {
	const productId = req.swagger.params.id.value;
	console.log("Deleting product: "+productId);
	Products.deleteOne({ id: productId }, (err, res) => {
		if (err) resp.sendStatus(500);
		else if (res.deletedCount) resp.sendStatus(200);
		else resp.sendStatus(404);
	});
}


module.exports = {
	searchProducts: list,
	addProduct: addProduct,
	getProduct: get,
	deleteProduct: deleteProduct,
	getProductReviews: getReviews
};