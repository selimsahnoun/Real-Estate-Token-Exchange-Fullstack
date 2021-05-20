const User = require('./../models/user.js');

// add a user to the users collection
exports.createUser = (user) => {
	return User.create(user);
};

// check if an email already exists in the database
exports.findEmail = (email) => {
	return User.find({ email });
};
