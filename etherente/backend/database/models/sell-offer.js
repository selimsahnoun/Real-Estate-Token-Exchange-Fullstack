const mongoose = require('mongoose');

const sellSchema = new mongoose.Schema(
	{
		seller: String,
		amount: String,
		price: String,
	},
	{
		timestamps: true,
	}
);

const SellOffer = mongoose.model('SellOffer', sellSchema);

module.exports = SellOffer;
