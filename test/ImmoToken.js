var ImmoToken = artifacts.require('./ImmoToken.sol');

contract('ImmoToken', function (accounts) {
	var tokenInstance;
	it('initializes the contract with the correct values', function () {
		return ImmoToken.deployed()
			.then(async function (instance) {
				tokenInstance = instance;
				return tokenInstance.title();
			})
			.then(function (title) {
				assert.equal(
					title,
					'Immo Token',
					'correctly set the title to : 55 57 rue du Faubourg Saint Honore 75008'
				);
				return tokenInstance.symbol();
			})
			.then(function (symbol) {
				assert.equal(symbol, 'Stone', 'correctly set the symbol to : Stone');
				return tokenInstance.version();
			})
			.then(function (version) {
				assert.equal(
					version,
					'Immo Token v1.0',
					'correctly set the version to : v1.0'
				);
				return tokenInstance.version();
			});
	});
	it('allocates the initial supply after deployment', function () {
		return ImmoToken.deployed()
			.then(async function (instance) {
				tokenInstance = instance;
				//const tokenInitial = await tokenInstance.ImmoTokenSupply(100000);
				return tokenInstance.totalSupply();
			})
			.then(function (totalSupply) {
				assert.equal(
					totalSupply.toNumber(),
					100000,
					'sets the total supply to 100,000'
				);
				return tokenInstance.balanceOf(accounts[0]);
			})
			.then(function (adminBalance) {
				assert.equal(
					adminBalance.toNumber(),
					100000,
					'it allocates the initial supply to the admin account'
				);
			});
	});
	it('transfers token ownership', function () {
		return ImmoToken.deployed()
			.then(function (instance) {
				tokenInstance = instance;
				return tokenInstance.transfer.call(accounts[1], 99999999999);
			})
			.then(assert.fail)
			.catch(function (error) {
				assert(
					error.message.indexOf('revert') >= 0,
					'error message must contain revert'
				);
				return tokenInstance.transfer.call(accounts[1], 1000, {
					from: accounts[0],
				});
			})
			.then(function (success) {
				assert.equal(
					success,
					true,
					'returns success when the transaction is successful'
				);
				return tokenInstance.transfer(accounts[1], 1000, {
					from: accounts[0],
				});
			})
			.then(async function (transaction) {
				assert.equal(transaction.logs.length, 1, 'triggers one event');
				assert.equal(
					transaction.logs[0].event,
					'Transfer',
					'triggers "Transfer" event'
				);
				assert.equal(
					transaction.logs[0].args._from,
					accounts[0],
					'logs the account the tokens are transferred from'
				);
				assert.equal(
					transaction.logs[0].args._to,
					accounts[1],
					'logs the account the tokens are transferred to'
				);
				assert.equal(
					transaction.logs[0].args._value,
					1000,
					'logs the amount of tokens that are transferred'
				);
				const recipientBalance = await tokenInstance.balanceOf(accounts[1]);
				assert.equal(
					recipientBalance.toNumber(),
					1000,
					'adds the amount sent to the recipient'
				);
				const senderBalance = await tokenInstance.balanceOf(accounts[0]);
				assert.equal(
					senderBalance.toNumber(),
					99000,
					'deduct the amount sent from the sender'
				);
			});
	});
	it('approves tokens for delegated transfer', function () {
		return ImmoToken.deployed()
			.then(function (instance) {
				tokenInstance = instance;
				return tokenInstance.approve.call(accounts[1], 100);
			})
			.then(function (success) {
				assert.equal(success, true, 'returns true');
				return tokenInstance.approve(accounts[1], 100, { from: accounts[0] });
			})
			.then(function (approval) {
				assert.equal(approval.logs.length, 1, 'triggers one event');
				assert.equal(
					approval.logs[0].event,
					'Approval',
					'triggers "Approval" event'
				);
				assert.equal(
					approval.logs[0].args._owner,
					accounts[0],
					'logs the account the tokens are authorized by'
				);
				assert.equal(
					approval.logs[0].args._spender,
					accounts[1],
					'logs the account the tokens are authorized to'
				);
				assert.equal(
					approval.logs[0].args._value,
					100,
					'logs the amount of tokens that are transferred'
				);
				return tokenInstance.allowance(accounts[0], accounts[1]);
			})
			.then(function (allowance) {
				assert.equal(
					allowance,
					100,
					'stores the allowance for delegated transfer'
				);
				//return tokenInstance.approve(accounts[1], 100, { from: accounts[0] });
			});
	});
	it('handles delegated token transfers', function () {
		return ImmoToken.deployed().then(async function (instance) {
			tokenInstance = instance;
			fromAccount = accounts[2];
			toAccount = accounts[3];
			spendingAccount = accounts[4];
			//Allocate some tokens to fromAccount
			const fromAccountAllocation = await tokenInstance.transfer(
				fromAccount,
				100,
				{
					from: accounts[0],
				}
			);
			//Approuve spendingAccount to spend 10 tokens from fromAccount
			const spendingAccountApproval = await tokenInstance.approve(
				spendingAccount,
				10,
				{
					from: fromAccount,
				}
			);
			//Try transfering something larger than sender's balance
			return tokenInstance
				.transferFrom(fromAccount, toAccount, 101, {
					from: spendingAccount,
				})
				.then(assert.fail)
				.catch(function (error) {
					assert(
						error.message.indexOf('revert') >= 0,
						'cannot transfer value larger than balance'
					);
					//Try transfering something larger than sender's allowance
					return tokenInstance.transferFrom(fromAccount, toAccount, 20, {
						from: spendingAccount,
					});
				})
				.then(assert.fail)
				.catch(function (error) {
					assert(
						error.message.indexOf('revert') >= 0,
						'cannot transfer value larger than approved amount'
					);
					return tokenInstance.transferFrom.call(fromAccount, toAccount, 10, {
						from: spendingAccount,
					});
				})
				.then(function (success) {
					assert.equal(success, true, 'successful transaction');
					return tokenInstance.transferFrom(fromAccount, toAccount, 10, {
						from: spendingAccount,
					});
				})
				.then(function (transfer) {
					assert.equal(transfer.logs.length, 1, 'triggers one event');
					assert.equal(
						transfer.logs[0].event,
						'Transfer',
						'triggers "Transfer" event'
					);
					assert.equal(
						transfer.logs[0].args._from,
						fromAccount,
						'logs the account the tokens are transfered from'
					);
					assert.equal(
						transfer.logs[0].args._to,
						toAccount,
						'logs the account the tokens are transfered to'
					);
					assert.equal(
						transfer.logs[0].args._value,
						10,
						'logs the transfer amount'
					);
					return tokenInstance.balanceOf(fromAccount);
				})
				.then(function (balance) {
					assert.equal(
						balance.toNumber(),
						90,
						'deducts the correct amount from balance of sending account'
					);
					return tokenInstance.balanceOf(toAccount);
				})
				.then(function (balance) {
					assert.equal(
						balance.toNumber(),
						10,
						'add the correct amount to balance of receiving account'
					);
					return tokenInstance.allowance(fromAccount, spendingAccount);
				})
				.then(function (allowance) {
					assert.equal(
						allowance.toNumber(),
						0,
						'deducts the correct amount from allowance of spending account'
					);
				});
		});
	});
});
