const userControllers = require('./../../database/controllers/user.js');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

exports.checkMissingElement = (first_name, last_name, email, password) => {
	var errorsToSend = [];
	if (!first_name) {
		errorsToSend.push('First name missing');
	}
	if (!last_name) {
		errorsToSend.push('Last name missing');
	}
	if (!email) {
		errorsToSend.push('Email missing');
	}
	if (!password) {
		errorsToSend.push('Password missing');
	}
	return errorsToSend;
};

exports.checkUsedEmail = async (email) => {
	if (email.length > 1) {
		const dbUserEmail = await userControllers.findEmail(email);
		if (dbUserEmail.length > 0) {
			return 'An account with this email already exists';
		} else {
			return false;
		}
	} else {
		return false;
	}
};

exports.checkPasswordlength = (password) => {
	if (password.length < 5) {
		return 'Password too short';
	}
	return false;
};

exports.hashAndSendtoDB = async (user) => {
	//create salt
	const salt = await bcrypt.genSalt(saltRounds);
	//hash password with salt
	const hashPass = await bcrypt.hash(user.password, salt);
	//Create new user in the database
	const addedUser = await userControllers.createUser({
		first_name: user.first_name,
		last_name: user.last_name,
		email: user.email,
		contract_address: user.contract_address,
		hashed_password: hashPass,
		salt: salt,
		admin: false,
	});

	return {
		first_name: addedUser.first_name,
		last_name: addedUser.last_name,
		email: addedUser.email,
		contract_address: addedUser.contract_address,
		admin: addedUser.admin,
	};
};
exports.signToken = (user) => {
	const token = jwt.sign(
		{
			first_name: user.first_name,
			last_name: user.last_name,
			email: user.email,
			contract_address: user.contract_address,
			admin: user.admin,
		},
		process.env.JWT_SECRET,
		{
			expiresIn: process.env.JWT_EXPIRES_IN,
		}
	);
	return token;
};
exports.checkLoginCredentials = async (email, password) => {
	const dbUser = await userControllers.findEmail(email);
	if (dbUser.length === 1) {
		const hashPass = await bcrypt.hash(password, dbUser[0].salt);
		if (hashPass === dbUser[0].hashed_password) {
			return {
				first_name: dbUser[0].first_name,
				last_name: dbUser[0].last_name,
				email: dbUser[0].email,
				contract_address: dbUser[0].contract_address,
				admin: dbUser[0].admin,
			};
		} else {
			return { error: 'Invalid password' };
		}
	} else {
		return { error: "This email doesn't exist" };
	}
};
exports.checkEmailExist = async (email) => {
	const dbUser = await userControllers.findEmail(email);

	if (dbUser[0].email === email) {
		return dbUser[0];
	} else {
		return false;
	}
};
