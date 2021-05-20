var ImmoTokenSale = artifacts.require('./ImmoTokenSale.sol');
var ImmoToken = artifacts.require('./ImmoToken.sol');
const tokenSupply = 100000;
const tokenPrice = 100000000000000; //in wei = 0.0001 Eth
const numberOfTokensSold = 10;
const fees = numberOfTokensSold * tokenPrice;
const tokensForSale = 0.8 * tokenSupply; //80% of the tokens for the sale contract
var tokenSaleInstance, buyer, admin;

contract('ImmoTokenSale', function (accounts) {
	buyer = accounts[1];
	admin = accounts[0];
	it('initializes the contract with the correct values', function () {
		return ImmoTokenSale.deployed()
			.then(function (instance) {
				tokenSaleInstance = instance;
				return tokenSaleInstance.address;
			})
			.then(function (address) {
				assert.notEqual(address, '0x0', 'has a contract address');
				return tokenSaleInstance.tokenContract();
			})
			.then(function (tokenContract) {
				assert.notEqual(tokenContract, '0x0', 'has a token contract address');
				return tokenSaleInstance.tokenPrice();
			})
			.then(function (price) {
				assert.equal(
					price.toNumber(),
					tokenPrice,
					'has a token contract address'
				);
			});
	});
	it('facilitates token buying', async function () {
		const ImmoTokenInstance = await ImmoToken.deployed();
		return ImmoTokenSale.deployed()
			.then(async function (instance) {
				tokenSaleInstance = instance;
				const saleTokenTransfer = await ImmoTokenInstance.transfer(
					tokenSaleInstance.address,
					tokensForSale,
					{ from: admin }
				);
				return tokenSaleInstance.buyTokens(numberOfTokensSold, {
					from: buyer,
					value: fees,
				});
			})
			.then(async function (receipt) {
				const amount = await tokenSaleInstance.tokensSold();
				const buyerBalance = await ImmoTokenInstance.balanceOf(buyer);
				const tokensLeftForSale = await ImmoTokenInstance.balanceOf(
					tokenSaleInstance.address
				);
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
				return tokenSaleInstance.buyTokens(numberOfTokensSold, {
					from: buyer,
					value: 1,
				});
			})
			.then(assert.fail)
			.catch(function (error) {
				assert(
					error.message.indexOf('revert') >= 0,
					'msg.value must equal number of tokens in wei'
				);
			})
			.then(function () {
				return tokenSaleInstance.buyTokens(tokensForSale * 3, {
					from: buyer,
					value: fees,
				});
			})
			.then(assert.fail)
			.catch(function (error) {
				assert(
					error.message.indexOf('revert') >= 0,
					'cannot trade more than available'
				);
			});
	});
	it('ends token buying', async function () {
		const ImmoTokenInstance = await ImmoToken.deployed();
		return ImmoTokenSale.deployed()
			.then(function (instance) {
				tokenSaleInstance = instance;

				return tokenSaleInstance.endSale({
					from: buyer,
				});
			})
			.then(assert.fail)
			.catch(function (error) {
				assert(
					error.message.indexOf('revert') >= 0,
					'must be admin to end the sale'
				);
				return tokenSaleInstance.endSale({
					from: admin,
				});
			})
			.then(async function () {
				const adminBalance = await ImmoTokenInstance.balanceOf(admin);
				assert.equal(
					adminBalance.toNumber(),
					tokenSupply - numberOfTokensSold,
					'returns all unsold tokens to admin'
				);
				// 	return tokenSaleInstance.tokenPrice();
				// })
				// .then(assert.fail)
				// .catch(function (error) {
				// 	assert(error.message.indexOf('revert') >= 0, 'contract is killed');
			});
	});
});
