const ImmoToken = artifacts.require('ImmoToken');
const ImmoTokenSale = artifacts.require('ImmoTokenSale');
const ReceiverPays = artifacts.require('ReceiverPays');

const price = 100000000000000; //in wei = 0.0001 Eth
const tokenSupply = 100000;

// module.exports = function (deployer) {
// 	deployer.deploy(ImmoToken, tokenSupply).then(() => {
// 		return deployer.deploy(ImmoTokenSale, ImmoToken.address, price);
// 	});
// };

module.exports = async function (deployer) {
	//deploy ERC 20
	await deployer.deploy(ImmoToken, tokenSupply);
	const ImmoTokenInstance = await ImmoToken.deployed();
	//deploy ImmoTokenSale
	await deployer.deploy(ImmoTokenSale, ImmoTokenInstance.address, price);
	const ImmoTokenSaleInstance = await ImmoTokenSale.deployed();
	//Allow ImmoTokenSale to transfer Tokens
	const success = await ImmoTokenInstance.allowContract(
		ImmoTokenSaleInstance.address
	);

	const contractAllowed = await ImmoTokenInstance.saleContract.call();
	console.log('Allowed contract: ', contractAllowed);
	//deploy RECIEVER PAYS
	await deployer.deploy(ReceiverPays);
};
