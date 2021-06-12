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
exports.checkMissingElementForSale = (owner, tokens, price) => {
	var errorsToSend = [];
	if (!owner) {
		errorsToSend.push('Owner address missing');
	}
	if (!tokens) {
		errorsToSend.push('Tokens number missing');
	}
	if (!price) {
		errorsToSend.push('Price value missing');
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
exports.addOfferToSell = async (seller, amount, price) => {
	const addedOffer = await transactionControllers.createSellOffer({
		seller,
		amount,
		price,
	});
	return addedOffer;
};
exports.fetchAllAddress = async () => {
	const allTransactions = await transactionControllers.fetchAllTransactions();
	var uniqueAddress = [];
	for (var i = 0; i < allTransactions.length; i++) {
		if (
			!uniqueAddress.includes(allTransactions[i].from_address) &&
			allTransactions[i].from_address != process.env.VUE_APP_OWNER_ADDRESS
		) {
			uniqueAddress.push(allTransactions[i].from_address);
		} else if (
			!uniqueAddress.includes(allTransactions[i].to_address) &&
			allTransactions[i].to_address != process.env.VUE_APP_OWNER_ADDRESS
		) {
			uniqueAddress.push(allTransactions[i].to_address);
		}
	}

	return uniqueAddress;
};
exports.fetchAllOffers = async () => {
	const allOffers = await transactionControllers.fetchAllOffers();
	return allOffers;
};
