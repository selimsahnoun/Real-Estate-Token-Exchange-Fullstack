const express = require('express');
const router = express.Router();

router.get('/buyers', async (req, res) => {
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
			if (errorsToSend.length > 0) {
				res.status(400).json({
					errors: errorsToSend,
				});
			}
			//sign token
			const token = signToken(userProfile);

			res.status(200).json({
				token,
				email: userProfile.email,
				first_name: userProfile.first_name,
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

module.exports = router;
