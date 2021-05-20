const ImmoToken = artifacts.require('ImmoToken');
const ImmoTokenSale = artifacts.require('ImmoTokenSale');
const SimpleStorage = artifacts.require('SimpleStorage');

const price = 100000000000000; //in wei = 0.0001 Eth
const tokenSupply = 100000;

module.exports = function (deployer) {
	deployer.deploy(ImmoToken, tokenSupply).then(() => {
		return deployer.deploy(ImmoTokenSale, ImmoToken.address, price);
	});
    deployer.deploy(SimpleStorage);
};
//ImmoToken.deployed().then(function (instance) {tokenInstance = instance;})
