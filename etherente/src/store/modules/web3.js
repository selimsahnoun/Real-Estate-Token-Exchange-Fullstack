import * as transactionService from '../../service/transaction.service.js';

export const state = {
	web3: null,
	accounts: null,
	saleContract: null,
	erc20Contract: null,
};
export const mutations = {
	SET_ALL_STATE(state, payload) {
		state.web3 = payload.web3;
		state.accounts = payload.accounts;
		state.saleContract = payload.ImmoTokenSaleInstance;
		state.erc20Contract = payload.ImmoTokenInstance;
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
	//transfer tokens from erc20 to sale contract
	async TRANSFER_TOKENS(state, payload) {
		await state.erc20Contract.methods
			.transfer(state.saleContract.options.address, payload.tokens)
			.send({ from: state.accounts[0] })
			.then((response) => {
				// send details to database
				transactionService.addTransaction(
					response.events.Transfer.returnValues._from,
					response.events.Transfer.returnValues._to,
					response.events.Transfer.returnValues._value
				);
			});
	},
	async SELL_TOKENS(state, payload) {
		await state.saleContract.methods
			.bookOffer(payload.tokens, payload.price)
			.send({ from: state.accounts[0] })
			.then((response) => {
				// // send details to database
				transactionService.addSellOffer(
					response.events.SellOffer.returnValues._seller,
					response.events.SellOffer.returnValues._amount,
					response.events.SellOffer.returnValues._price
				);
			});
	},
	//transfer tokens from client to client
	async BUY_OFFER_TOKENS(state, payload) {
		await state.saleContract.methods
			.buyOffer(payload.seller, payload.amount, payload.index)
			.send({ from: state.accounts[0], value: payload.price })
			.then((response) => {
				console.log(response);
				// // // send details to database
				// transactionService.addSellOffer(
				// 	response.events.SellOffer.returnValues._seller,
				// 	response.events.SellOffer.returnValues._amount,
				// 	response.events.SellOffer.returnValues._price
				// );
			});
	},
};
export const actions = {
	setAllState(context, payload) {
		context.commit('SET_ALL_STATE', payload);
	},
	buyTokens(context, payload) {
		context.commit('BUY_TOKENS', payload);
	},
	transferTokens(context, payload) {
		context.commit('TRANSFER_TOKENS', payload);
	},
	sellTokens(context, payload) {
		context.commit('SELL_TOKENS', payload);
	},
	buyOfferTokens(context, payload) {
		context.commit('BUY_OFFER_TOKENS', payload);
	},
};
export const getters = {
	getTotalTokens: async (state) => {
		return state.erc20Contract.methods
			.totalSupply()
			.call({ from: state.saleContract.options.address })
			.then((totalSupply) => totalSupply);
	},
	getRemainingTokensInERC20: (state) => {
		return state.erc20Contract.methods
			.balanceOf(process.env.VUE_APP_OWNER_ADDRESS)
			.call({ from: state.saleContract.options.address })
			.then((balance) => balance);
	},
	getTokensLeftForSale: async (state) => {
		return state.erc20Contract.methods
			.balanceOf(state.saleContract.options.address)
			.call({ from: state.saleContract.options.address })
			.then((leftForSale) => leftForSale);
	},
	getBalance: (state) => (address) => {
		return state.erc20Contract.methods
			.balanceOf(address)
			.call({ from: state.saleContract.options.address })
			.then((balance) => balance);
	},
	getOffer: (state) => (address, index) => {
		return state.saleContract.methods
			.offerBooking(address, index)
			.call({ from: state.saleContract.options.address })
			.then((balance) => balance);
	},
};
