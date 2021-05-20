import { createStore } from 'vuex';
import * as user from './modules/user';
export default createStore({
	state: {
		totalTokens: 0,
		web3: null,
		accounts: null,
		saleContract: null,
		erc20Contract: null,
		transferDone: false,
	},
	mutations: {
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
		SET_TRANSFER_DONE(state, payload) {
			state.transferDone = payload;
		},
		async BUY_TOKENS(state, payload) {
			await state.saleContract.methods
				.buyTokens(payload.tokens)
				.send({ from: state.accounts[0], value: payload.value })
				.then(console.log);
		},
	},
	actions: {
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
		transferDone(context, event) {
			context.commit('SET_TRANSFER_DONE', event);
		},
		buyTokens(context, event) {
			context.commit('BUY_TOKENS', event);
		},
	},
	getters: {
		getTotalTokens: async (state) => {
			return state.erc20Contract.methods
				.totalSupply()
				.call({ from: state.saleContract.options.address })
				.then((totalSupply) => totalSupply);
		},
		getTokensLeftForSale: async (state) => {
			return state.erc20Contract.methods
				.balanceOf(state.saleContract.options.address)
				.call({ from: state.saleContract.options.address })
				.then((leftForSale) => leftForSale);
		},
	},
	modules: { user },
});
