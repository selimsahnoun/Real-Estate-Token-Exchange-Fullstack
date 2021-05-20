const mongoose = require('mongoose');

//------property Highlights Schema ------------//
const propertyHighlightsSchema = new mongoose.Schema({
	address: String,
	city: String,
	expectedYield: String,
	rentStartDate: String,
	rentperToken: String,
	tokenPrice: String,
	totalTokens: String,
	propertyType: String,
	neighborhood: String,
	area: String,
	lotSize: String,
	bedrooms: String,
	rented: String,
	legalLiability: String,
});

//------financial Highlights Schema ------------//
const financialHighlightsSchema = new mongoose.Schema({
	grossRentPerYear: String,
	grossRentPerMonth: String,
	monthlyCosts: String,
	netRentPerMonth: String,
	netRentPerYear: String,
	totalInvestment: String,
	expectedYield: String,
	maintenanceReserve: String,
	dateOfPurchase: String,
});

const houseSchema = new mongoose.Schema(
	{
		propertyHighlights: {
			type: propertyHighlightsSchema,
			required: true,
		},
		financialHighlights: {
			type: financialHighlightsSchema,
			required: true,
		},
		pictures: [{ url: String }],
	},
	{
		timestamps: true,
	}
);

const House = mongoose.model('House', houseSchema);

module.exports = House;
