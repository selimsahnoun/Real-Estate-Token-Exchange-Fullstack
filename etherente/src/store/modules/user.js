import * as userService from '../../service/user.service.js';

export const state = { user: null, registerErrors: null, loginErrors: null };
export const mutations = {
	SET_USER_DATA(state, userData) {
		state.errors = null;
		state.user = userData;
		localStorage.setItem('user', JSON.stringify(userData));
		userService.clearAuthorization();
		userService.authorization(userData);
	},
	CLEAR_USER_DATA() {
		localStorage.removeItem('user');
		location.reload();
	},
	SET_LOGIN_ERRORS(state, errors) {
		state.loginErrors = errors;
	},
	SET_REGISTER_ERRORS(state, errors) {
		state.registerErrors = errors;
	},
};
export const actions = {
	async getIpAddress() {
		const ipAddress = await userService.getIpAddress();
		return ipAddress.ip;
	},
	async register({ commit }, credentials) {
		const { data } = await userService.register(credentials);
		if (data.errors) {
			commit('SET_REGISTER_ERRORS', data.errors);
		} else {
			commit('SET_USER_DATA', data);
		}
	},
	async login({ commit }, credentials) {
		const { data } = await userService.login(credentials);
		if (data.errors) {
			commit('SET_LOGIN_ERRORS', data.errors);
		} else {
			commit('SET_USER_DATA', data);
		}
	},
	setUserData({ commit }, userData) {
		commit('SET_USER_DATA', userData);
	},
	logout({ commit }) {
		commit('CLEAR_USER_DATA');
	},
	async verifySession({ commit }, userData) {
		const { data } = await userService.verifySession(userData);
		if (data.errors) {
			commit('CLEAR_USER_DATA');
		} else {
			commit('SET_USER_DATA', data);
		}
	},
};
export const getters = {
	loggedIn(state) {
		return !!state.user;
	},
};
