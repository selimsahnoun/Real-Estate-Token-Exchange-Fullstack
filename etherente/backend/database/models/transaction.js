const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
	{
		from_address: String,
		to_address: String,
		tokens: String,
		balance: String,
	},
	{
		timestamps: true,
	}
);

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
