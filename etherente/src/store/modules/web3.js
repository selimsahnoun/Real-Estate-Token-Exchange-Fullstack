import * as transactionService from '../../service/transaction.service.js';

export const state = {
	totalTokens: 0,
	web3: null,
	accounts: null,
	saleContract: null,
	erc20Contract: null,
};
export const mutations = {
	SET_WEB_3(state, payload) {
		state.web3 = payload;
	},
	SET_ACCOUNTS(state, payload) {
		state.accounts = payload;
	},
	SET_SALE_CONTRACT(state, payload) {
		state.saleContract = payload;
	},
	SET_ERC20_CONTRACT(state, payload) {
		state.erc20Contract = payload;
	},
	SET_TOTAL_TOKENS(state, payload) {
		state.totalTokens = payload;
	},
	async BUY_TOKENS(state, payload) {
		await state.saleContract.methods
			.buyTokens(payload.tokens)
			.send({ from: state.accounts[0], value: payload.value })
			.then((response) => {
				// send details to database
				transactionService.addTransaction(
					response.events.Sell.returnValues._buyer,
					response.events.Sell.address,
					response.events.Sell.returnValues._amount
				);
			});
	},
};
export const actions = {
	setWeb3(context, event) {
		context.commit('SET_WEB_3', event);
	},
	setAccounts(context, event) {
		context.commit('SET_ACCOUNTS', event);
	},
	setSaleContract(context, event) {
		context.commit('SET_SALE_CONTRACT', event);
	},
	setErc20Contract(context, event) {
		context.commit('SET_ERC20_CONTRACT', event);
	},
	buyTokens(context, event) {
		context.commit('BUY_TOKENS', event);
	},
};
export const getters = {
	getTotalTokens: async (state) => {
		return state.erc20Contract.methods
			.totalSupply()
			.call({ from: state.saleContract.options.address })
			.then((totalSupply) => totalSupply);
	},
	getRemainingTokensInERC20: async (state) => {
		return state.erc20Contract.methods
			.remainingSupply()
			.call({ from: state.saleContract.options.address })
			.then((remainingSupply) => remainingSupply);
	},
	getTokensLeftForSale: async (state) => {
		return state.erc20Contract.methods
			.balanceOf(state.saleContract.options.address)
			.call({ from: state.saleContract.options.address })
			.then((leftForSale) => leftForSale);
	},
};
