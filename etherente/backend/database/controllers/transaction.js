const Transaction = require('./../models/transaction.js');
const SellOffer = require('./../models/sell-offer.js');
// add a Transaction to the Transactions collection
exports.createTransaction = (transaction) => {
	return Transaction.create(transaction);
};
exports.fetchAllTransactions = () => {
	return Transaction.find();
};
exports.createSellOffer = (offer) => {
	return SellOffer.create(offer);
};
exports.fetchAllOffers = () => {
	return SellOffer.find();
};
