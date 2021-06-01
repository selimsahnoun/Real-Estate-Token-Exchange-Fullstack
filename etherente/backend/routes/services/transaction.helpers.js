const transactionControllers = require('./../../database/controllers/transaction.js');

exports.checkMissingElement = (from_address, to_address, tokens) => {
	var errorsToSend = [];
	if (!from_address) {
		errorsToSend.push('From address missing');
	}
	if (!to_address) {
		errorsToSend.push('To address missing');
	}
	if (!tokens) {
		errorsToSend.push('Tokens number missing');
	}

	return errorsToSend;
};

exports.addTransaction = async (from_address, to_address, tokens) => {
	const addedTransaction = await transactionControllers.createTransaction({
		from_address: from_address,
		to_address: to_address,
		tokens: tokens,
	});
	return addedTransaction;
};
