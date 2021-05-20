const express = require('express');
const router = express.Router();
const houseControllers = require('./../database/controllers/house.js');

router.get('/houseslist', (req, res) => {
	houseControllers
		.fetchAllHouses()
		.then((response) => res.status(200).json(response))
		.catch((error) =>
			res.status(500).json({
				error,
			})
		);
});
router.get('/houseslist/:id', (req, res) => {
	houseControllers
		.fetchHouseById(req.params.id.toString())
		.then((response) => res.status(200).json(response))
		.catch((error) =>
			res.status(500).json({
				error,
			})
		);
});

router.post('/addhouse', (req, res) => {
	try {
		const newhouse = {
			propertyHighlights: {
				address: req.body.propertyHighlights.address,
				city: req.body.propertyHighlights.city,
				expectedYield: req.body.propertyHighlights.expectedYield,
				rentStartDate: req.body.propertyHighlights.rentStartDate,
				rentperToken: req.body.propertyHighlights.rentperToken,
				tokenPrice: req.body.propertyHighlights.tokenPrice,
				totalTokens: req.body.propertyHighlights.totalTokens,
				propertyType: req.body.propertyHighlights.propertyType,
				neighborhood: req.body.propertyHighlights.neighborhood,
				area: req.body.propertyHighlights.area,
				lotSize: req.body.propertyHighlights.lotSize,
				bedrooms: req.body.propertyHighlights.bedrooms,
				rented: req.body.propertyHighlights.rented,
				legalLiability: req.body.propertyHighlights.legalLiability,
			},
			financialHighlights: {
				grossRentPerYear: req.body.financialHighlights.grossRentPerYear,
				grossRentPerMonth: req.body.financialHighlights.grossRentPerMonth,
				monthlyCosts: req.body.financialHighlights.monthlyCosts,
				netRentPerMonth: req.body.financialHighlights.netRentPerMonth,
				netRentPerYear: req.body.financialHighlights.netRentPerYear,
				totalInvestment: req.body.financialHighlights.totalInvestment,
				expectedYield: req.body.financialHighlights.expectedYield,
				maintenanceReserve: req.body.financialHighlights.maintenanceReserve,
				dateOfPurchase: req.body.financialHighlights.dateOfPurchase,
			},
			pictures: req.body.pictures,
		};
		houseControllers
			.addHouse(newhouse)
			.then((response) =>
				res.status(200).json({
					response,
					message: 'house successfully added',
				})
			)
			.catch((error) => res.sendStatus(400).json({ error }));
	} catch (error) {
		res.status(500).send({
			message: error.message,
		});
	}
});

module.exports = router;
