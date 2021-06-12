import Web3 from 'web3';
import ImmoTokenSaleContract from '../src/contracts/ImmoTokenSale.json';
import ImmoTokenContract from '../src/contracts/ImmoToken.json';

const getWeb3 = () =>
	new Promise(async (resolve, reject) => {
		// Wait for loading completion to avoid race conditions with web3 injection timing.
		// window.addEventListener(
		// 	'load',
		// 	async () => {
		// Modern dapp browsers...
		if (window.ethereum) {
			const web3 = new Web3(window.ethereum);
			try {
				// Request account access if needed
				await window.ethereum.enable();
				// Acccounts now exposed
				resolve(web3);
			} catch (error) {
				reject(error);
			}
		}
		// Legacy dapp browsers...
		else if (window.web3) {
			// Use Mist/MetaMask's provider.
			const web3 = window.web3;
			console.log('Injected web3 detected.');
			resolve(web3);
		}
		// Fallback to localhost; use dev console port by default...
		else {
			const provider = new Web3.providers.HttpProvider('http://127.0.0.1:7544');
			const web3 = new Web3(provider);
			console.log('No web3 instance injected, using Local web3.');
			resolve(web3);
		}
		// 	}
		// );
	});
const contractInstance = async () => {
	// Get network provider and web3 instance.
	const web3 = await getWeb3();
	// Use web3 to get the user's accounts.
	const accounts = await web3.eth.getAccounts();
	// Get the contract instance.
	const networkId = await web3.eth.net.getId();

	const deployedSaleNetwork = ImmoTokenSaleContract.networks[networkId];
	const deployedErc20Network = ImmoTokenContract.networks[networkId];

	const ImmoTokenInstance = new web3.eth.Contract(
		ImmoTokenContract.abi,
		deployedErc20Network && deployedErc20Network.address
	);
	const ImmoTokenSaleInstance = new web3.eth.Contract(
		ImmoTokenSaleContract.abi,
		deployedSaleNetwork && deployedSaleNetwork.address
	);
	return { web3, accounts, ImmoTokenSaleInstance, ImmoTokenInstance };
};

export default contractInstance;
