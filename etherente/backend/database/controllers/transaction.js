const Transaction = require('./../models/Transaction.js');

// add a Transaction to the Transactions collection
exports.createTransaction = (transaction) => {
	return Transaction.create(transaction);
};
