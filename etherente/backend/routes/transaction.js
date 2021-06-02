const express = require('express');
const router = express.Router();
const {
	checkMissingElement,
	addTransaction,
	fetchAllAddress,
} = require('./services/transaction.helpers.js');
// add transaction to database
router.post('/addtransaction', async (req, res) => {
	try {
		if (req.body) {
			console.log(req.body.from_address, req.body.to_address, req.body.tokens);
			var errorsToSend = checkMissingElement(
				req.body.from_address,
				req.body.to_address,
				req.body.tokens
			);
			if (errorsToSend.length > 0) {
				res.status(400).json({
					errors: errorsToSend,
				});
			}
			// add transaction to database
			const addedTransaction = await addTransaction(
				req.body.from_address,
				req.body.to_address,
				req.body.tokens
			);
			res.status(200).json({
				addedTransaction,
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
router.get('/fetchalladdresses', async (req, res) => {
	try {
		// add transaction to database
		const allAddresses = await fetchAllAddress();
		res.status(200).json({
			allAddresses,
		});
	} catch (err) {
		res.status(500).send({
			message: err.message,
		});
	}
});
module.exports = router;
