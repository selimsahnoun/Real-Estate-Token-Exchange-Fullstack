var ImmoTokenSale = artifacts.require('./ImmoTokenSale.sol');
var ImmoToken = artifacts.require('./ImmoToken.sol');
const tokenSupply = 100000;
const tokenPrice = 100000000000000; //in wei = 0.0001 Eth
const numberOfTokensSold = 50000;
const sellPrice = 200000000000000; //in wei = 0.0002 Eth
const numberOfTokensToSell = 10000;
const offerBuyerTokens = 3000;
const firstOfferIndex = 0;
const fees = numberOfTokensSold * tokenPrice;
const tokensForSale = 0.8 * tokenSupply; //80% of the tokens for the sale contract

contract('ImmoTokenSale', function (accounts) {
	const admin = accounts[0];
	const buyer = accounts[1];
	const offerBuyer = accounts[2];

	it('initializes the contract with the correct values', async () => {
		const ImmoTokeSaleInstance = await ImmoTokenSale.deployed();
		const saleAdress = ImmoTokeSaleInstance.address;
		const tokenContract = await ImmoTokeSaleInstance.tokenContract();
		const price = await ImmoTokeSaleInstance.tokenPrice();
		//-----Tests---------------------------------------//
		assert.notEqual(saleAdress, '0x0', 'has a contract address');
		assert.notEqual(
			tokenContract,
			'0x0',
			'has a link with the ImmoToken contract with a correct address'
		);
		assert.equal(price.toNumber(), tokenPrice, 'has correct price per token');
	});
	it('Allows user to buy tokens', async () => {
		const ImmoTokenInstance = await ImmoToken.deployed();
		const ImmoTokeSaleInstance = await ImmoTokenSale.deployed();
		await ImmoTokenInstance.transfer(
			ImmoTokeSaleInstance.address,
			tokensForSale,
			{ from: admin }
		);
		const receipt = await ImmoTokeSaleInstance.buyTokens(numberOfTokensSold, {
			from: buyer,
			value: fees,
		});
		const amount = await ImmoTokeSaleInstance.tokensSold();
		const buyerBalance = await ImmoTokenInstance.balanceOf(buyer);
		const tokensLeftForSale = await ImmoTokenInstance.balanceOf(
			ImmoTokeSaleInstance.address
		);
		//---------Tests------------------------//
		//---------Triggers correct event------------------------//

		assert.equal(receipt.logs.length, 1, 'triggers one event');
		assert.equal(receipt.logs[0].event, 'Sell', 'triggers "Sell" event');
		assert.equal(
			receipt.logs[0].args._buyer,
			buyer,
			'logs the account the tokens are purchased from'
		);
		assert.equal(
			receipt.logs[0].args._amount,
			numberOfTokensSold,
			'logs the tokens that are puchased'
		);
		//---------Balances, tokens sold and for sale are updated------------------------//
		assert.equal(
			amount.toNumber(),
			numberOfTokensSold,
			'increments the number of tokens sold'
		);
		assert.equal(
			buyerBalance.toNumber(),
			numberOfTokensSold,
			'increments the balance of the buyer by the number of tokens sold'
		);
		assert.equal(
			tokensLeftForSale.toNumber(),
			tokensForSale - numberOfTokensSold,
			'decrements the number of tokens left for sale'
		);
		//---------Error when trying to buy more than vailable or for less price------------------------//
		return ImmoTokeSaleInstance.buyTokens(numberOfTokensSold, {
			from: buyer,
			value: 1,
		})
			.catch(function (error) {
				assert(
					error.message.indexOf('revert') >= 0,
					'msg.value must equal price of number of tokens in wei'
				);
			})
			.then(() => {
				return ImmoTokeSaleInstance.buyTokens(tokensForSale * 3, {
					from: buyer,
					value: fees,
				});
			})
			.catch(function (error) {
				assert(
					error.message.indexOf('revert') >= 0,
					'cannot trade more than the tokens available'
				);
			});
	});
	it('Allows a seller user to present an offer to sell tokens', async () => {
		const ImmoTokeSaleInstance = await ImmoTokenSale.deployed();
		const saleOfferReceipt = await ImmoTokeSaleInstance.bookOffer(
			numberOfTokensToSell,
			sellPrice,
			{
				from: buyer,
			}
		);
		//Check if it triggers the correct even with the correct parameters
		assert.equal(saleOfferReceipt.logs.length, 1, 'triggers one event');
		assert.equal(
			saleOfferReceipt.logs[0].event,
			'SellOffer',
			'triggers "SellOffer" event'
		);
		assert.equal(
			saleOfferReceipt.logs[0].args._seller,
			buyer,
			'logs the account that put tokens for sale'
		);
		assert.equal(
			saleOfferReceipt.logs[0].args._amount,
			numberOfTokensToSell,
			'logs the correct number of tokens that are for sale'
		);
		assert.equal(
			saleOfferReceipt.logs[0].args._price,
			sellPrice,
			'logs the correct price of tokens that are for sale'
		);
		assert.equal(
			saleOfferReceipt.logs[0].args._index,
			firstOfferIndex,
			'logs the correct index of the offer'
		);
		//Check if it records the correct amount and price of tokens to sell
		const recordedOffers = await ImmoTokeSaleInstance.offerBooking(
			buyer,
			firstOfferIndex
		);
		assert.equal(
			recordedOffers.amount,
			numberOfTokensToSell,
			'records the correct number of tokens that are for sale'
		);
		assert.equal(
			recordedOffers.price,
			sellPrice,
			'records the correct price of tokens that are for sale'
		);
	});
	it('Allows a user to buy tokens from another user', async () => {
		const ImmoTokenInstance = await ImmoToken.deployed();
		const ImmoTokeSaleInstance = await ImmoTokenSale.deployed();
		await ImmoTokeSaleInstance.buyOffer(
			buyer,
			offerBuyerTokens,
			firstOfferIndex,
			{ from: offerBuyer, value: offerBuyerTokens * sellPrice }
		);
		//Check if it credits the buyer's balance with the correct number of tokens
		const offerBuyerBalance = await ImmoTokenInstance.balanceOf(offerBuyer);
		assert.equal(
			offerBuyerBalance,
			offerBuyerTokens,
			'add to the balance of the buyer the correct amount of tokens'
		);
		//Check if it withdraws the seller's balance with the correct number of tokens
		const offerSellerBalance = await ImmoTokenInstance.balanceOf(buyer);
		assert.equal(
			offerSellerBalance,
			numberOfTokensSold - offerBuyerTokens,
			'withdraw from the sellers balance the correct amount of tokens'
		);
		//Check if remaining tokens left in the offer is reduced with the correct number of tokens
		const recordedOffers = await ImmoTokeSaleInstance.offerBooking(
			buyer,
			firstOfferIndex
		);
		assert.equal(
			recordedOffers.amount,
			numberOfTokensToSell - offerBuyerTokens,
			'withdraw from the sellers offer the correct amount of tokens'
		);
		//Check if the buyer tries to buy more than tokens in offer and expect a revert
		return (
			ImmoTokeSaleInstance.buyOffer(
				buyer,
				numberOfTokensToSell * 2,
				firstOfferIndex,
				{ from: offerBuyer, value: offerBuyerTokens * sellPrice }
			)
				.catch(function (error) {
					assert(
						error.message.indexOf('revert') >= 0,
						'number of tokens must be equal or less of what is remaining in the offer'
					);
				})
				.then(() => {
					return ImmoTokeSaleInstance.buyTokens(offerBuyerTokens, {
						from: buyer,
						value: fees,
					});
				})
				.catch(function (error) {
					assert(
						error.message.indexOf('revert') >= 0,
						'cannot trade more than the tokens available'
					);
				})
				//Check if the buyer tries to buy for a diffrent value than the price in offer and expect a revert
				.then(() => {
					return ImmoTokeSaleInstance.buyOffer(
						buyer,
						offerBuyerTokens,
						firstOfferIndex,
						{ from: offerBuyer, value: sellPrice }
					);
				})
				.catch(function (error) {
					assert(
						error.message.indexOf('revert') >= 0,
						'Cannot buy for a diffrent price than the sellPrice * tokens'
					);
				})
		);
	});
	it('Allows only admin to end the sale and receive remaining tokens in the contract', async () => {
		const ImmoTokenInstance = await ImmoToken.deployed();
		const ImmoTokeSaleInstance = await ImmoTokenSale.deployed();
		//Check if not an admin tries to end sale and expect a revert
		return ImmoTokeSaleInstance.endSale({
			from: buyer,
		})
			.catch(function (error) {
				assert(error.message.indexOf('revert') >= 0, 'Only admin can endSale');
			})
			.then(() => {
				return ImmoTokeSaleInstance.endSale({
					from: admin,
				});
			})
			.then(async () => {
				//Check if admin recieves remaining tokens
				await ImmoTokeSaleInstance.endSale({
					from: admin,
				});
				const adminBalance = await ImmoTokenInstance.balanceOf(admin);
				assert.equal(
					adminBalance,
					tokenSupply - numberOfTokensSold,
					'Admin recieves remaining tokens'
				);
			});
	});
});
