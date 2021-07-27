const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const userControllers = require('./../database/controllers/user.js');
const {
	checkUsedEmail,
	checkPasswordlength,
	checkMissingElement,
	hashAndSendtoDB,
	signToken,
	checkLoginCredentials,
	checkEmailExist,
} = require('./services/user.helpers.js');
//-------Register User---------------------//
//-------[POST]/register-------------------//
router.post('/register', async (req, res) => {
	try {
		if (req.body) {
			var errorsToSend = checkMissingElement(
				req.body.first_name,
				req.body.last_name,
				req.body.email,
				req.body.password
			);
			const user = {
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				contract_address: req.body.contract_address,
				password: req.body.password,
				admin: false,
			};
			//check if email already exists in the data base
			const emailError = await checkUsedEmail(user.email);
			emailError ? errorsToSend.push(emailError) : '';
			//Check if password long enough
			const passwordError = checkPasswordlength(user.password);
			passwordError ? errorsToSend.push(passwordError) : '';
			//push errors if there are any and send error status
			if (errorsToSend.length > 0) {
				res.status(400).send({ errors: errorsToSend });
			}
			//---------------------------------------------------//
			//Create new user in the DB
			const addedUser = await hashAndSendtoDB(user);
			if (addedUser.errors) {
				res.sendStatus(400).json({ errors: addedUser.errors });
			} else {
				//sign a jwt token
				const token = signToken(addedUser);
				res.status(200).json({
					token,
				});
			}
		} else {
			errorsToSend.push('An error occured, please try again');
			res.sendStatus(400).json({ errors: errorsToSend });
		}
	} catch (err) {
		res.status(500).send({
			message: err.message,
		});
	}
});
//-------Login User---------------------//
//-------[POST]/login-------------------//
router.post('/login', async (req, res) => {
	try {
		if (req.body) {
			var errorsToSend = checkMissingElement(
				true,
				true,
				req.body.password,
				req.body.email
			);
			if (errorsToSend.length > 0) {
				res.status(400).json({
					errors: errorsToSend,
				});
			}
			//check user in the database
			const userProfile = await checkLoginCredentials(
				req.body.email,
				req.body.password
			);
			userProfile.error ? errorsToSend.push(userProfile.error) : '';
			//send status 400 in case there is an error
			if (errorsToSend.length > 0) {
				res.status(400).json({
					errors: errorsToSend,
				});
			}
			//sign token
			const token = signToken(userProfile);

			res.status(200).json({
				token,
				first_name: userProfile.first_name,
				last_name: userProfile.last_name,
				email: userProfile.email,
				contract_address: userProfile.contract_address,
				admin: userProfile.admin,
			});
		} else {
			errorsToSend.push('An error occured, please try again');
			res.status(400).send({
				errors: errorsToSend,
			});
		}
	} catch (err) {
		res.status(500).send({
			message: err.message,
		});
	}
});
//-------Token Verification---------------------//
//-------[POST]/tokenverification-------------------//
router.post('/tokenverification', async (req, res) => {
	var errorsToSend = [];
	try {
		if (jwt.decode(req.body.token)) {
			//decode the existing token
			const decodedUserInfo = jwt.decode(req.body.token);
			//check if the email exists in the database
			const userFound = await checkEmailExist(decodedUserInfo.email);
			if (userFound) {
				//sign token
				const token = signToken(userFound);
				//console.log(userFound);
				res.status(200).json({
					token,
					first_name: userFound.first_name,
					last_name: userFound.last_name,
					email: userFound.email,
					contract_address: userFound.contract_address,
					admin: userFound.admin,
				});
			} else {
				errorsToSend.push('Invalid Token');
				res.status(400).json({
					errors: errorsToSend,
				});
			}
		} else {
			errorsToSend.push('Token is invalid');
			res.status(400).send({
				errors: errorsToSend,
			});
		}
	} catch (err) {
		res.status(500).send({
			message: err.message,
		});
	}
});

router.post('/adduser', (req, res) => {
	try {
		const newUser = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			contract_address: req.body.contract_address,
			salt: req.body.salt,
		};
		userControllers
			.createUser(newUser)
			.then((response) =>
				res.status(200).json({
					message: 'New user successfully created',
					id: response._id,
				})
			)
			.catch((err) =>
				res.status(400).send({
					message: err.message,
				})
			);
	} catch (err) {
		res.status(500).send({
			message: err.message,
		});
	}
});
module.exports = router;
