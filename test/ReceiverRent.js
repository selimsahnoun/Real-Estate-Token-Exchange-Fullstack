var ImmoTokenSale = artifacts.require('./ImmoTokenSale.sol');
var ImmoToken = artifacts.require('./ImmoToken.sol');
var ReceiverRent = artifacts.require('./ReceiverRent.sol');
const rentCredit = web3.utils.toWei('5', 'ether');
const nonce = 1234;
const claimedAmount = web3.utils.toWei('2', 'ether');
contract('ReceiverRent', function (accounts) {
	const admin = accounts[0];
	const buyer = accounts[1];
	const user = accounts[2];

	it('Allows Users to credit the contract with Ethers', async () => {
		const receiverRentInstance = await ReceiverRent.deployed();
		const receiverRentAddress = receiverRentInstance.address;
		const receipt = await receiverRentInstance.sendTransaction({
			from: admin,
			value: rentCredit,
		});
		//check if it emits the correct event
		assert.equal(receipt.logs.length, 1, 'triggers one event');
		assert.equal(receipt.logs[0].event, 'RentPayment', 'triggers "Sell" event');
		assert.equal(
			receipt.logs[0].args._sender,
			admin,
			'logs the account ethers where received from'
		);
		assert.equal(
			receipt.logs[0].args._amount,
			rentCredit,
			'logs the amount that was received'
		);
		//check if it receives Ethers
		let receiverRentBalance = await web3.eth.getBalance(receiverRentAddress);
		assert.equal(
			receiverRentBalance,
			rentCredit,
			'Balance is correctly credited'
		);
	});
	it('Allows user to hash messages', async () => {
		const receiverRentInstance = await ReceiverRent.deployed();
		const hashedMessage = await receiverRentInstance.getHashedMessage.call(
			buyer,
			claimedAmount,
			nonce,
			{
				from: admin,
			}
		);
		const secondHashedMessage =
			await receiverRentInstance.getHashedMessage.call(
				user,
				claimedAmount,
				nonce,
				{
					from: admin,
				}
			);
		assert.notEqual(hashedMessage, secondHashedMessage, 'Hash is different');
	});
	it('Allows user to claim rent', async () => {
		const receiverRentInstance = await ReceiverRent.deployed();
		const hashedMessage = await receiverRentInstance.getHashedMessage.call(
			buyer,
			claimedAmount,
			nonce,
			{
				from: admin,
			}
		);
		const signature = await web3.eth.sign(hashedMessage, admin);
		let v = '0x' + signature.slice(128 + 2, 130 + 2);
		let r = '0x' + signature.slice(2, 64 + 2);
		let s = '0x' + signature.slice(64 + 2, 128 + 2);
		//--in some cases with the accounts on Ganach, v is 0 or 1 when it's supposed to be 27 or 28
		if (v == '0x00') {
			v = '0x1b';
		} else if (v == '0x01') {
			v = '0x1c';
		}
		let buyerBalanceBeforeTransfer = web3.utils.fromWei(
			await web3.eth.getBalance(buyer),
			'ether'
		);

		const receipt = await receiverRentInstance.claimPayment(
			claimedAmount,
			nonce,
			v,
			r,
			s,
			{ from: buyer }
		);
		let buyerBalanceAfterTransfer = await web3.eth.getBalance(buyer);
		buyerBalanceAfterTransfer = web3.utils.fromWei(
			buyerBalanceAfterTransfer,
			'ether'
		);
		const expectedBalance = web3.utils.fromWei(claimedAmount, 'ether');
		//Check if it returns the claimed amount of ethers
		assert.equal(
			//we round up due to the error of margin with the gas fees
			Number.parseFloat(
				buyerBalanceAfterTransfer - buyerBalanceBeforeTransfer
			).toFixed(2),
			Number.parseFloat(expectedBalance).toFixed(2),
			'Transfer of rent has been correctly done'
		);

		//check if it declines claim if nonce already used
		return await receiverRentInstance
			.claimPayment(claimedAmount, nonce, v, r, s, { from: buyer })
			.catch(function (error) {
				assert(
					error.message.indexOf('revert') >= 0,
					'Nonce to be used only once'
				);
			})
			.then(async () => {
				//check if it declines claim if the signature is not from admin
				const fakeSignature = await web3.eth.sign(hashedMessage, user);
				v = '0x' + fakeSignature.slice(128 + 2, 130 + 2);
				r = '0x' + fakeSignature.slice(2, 64 + 2);
				s = '0x' + fakeSignature.slice(64 + 2, 128 + 2);
				//--in some cases with the accounts on Ganach, v is 0 or 1 when it's supposed to be 27 or 28
				if (v == '0x00') {
					v = '0x1b';
				} else if (v == '0x01') {
					v = '0x1c';
				}
				return receiverRentInstance
					.claimPayment(claimedAmount, nonce, v, r, s, { from: buyer })
					.catch(function (error) {
						assert(
							error.message.indexOf('revert') >= 0,
							'Signature is not from admin'
						);
					});
			});
	});
});
