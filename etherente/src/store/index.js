import { createStore } from 'vuex';
import * as user from './modules/user';
import * as web3 from './modules/web3';

export default createStore({
	state: {},
	mutations: {},
	actions: {},
	getters: {},
	modules: { user, web3 },
});
