const House = require('../models/house.js');

// find all houses added to the database
exports.fetchAllHouses = () => {
	return House.find({});
};

// find a house added to the database by its Id
exports.fetchHouseById = (id) => {
	return House.findById(id);
};

// find a house added to the database by its Id
exports.addHouse = (house) => {
	return House.create(house);
};
