import axios from 'axios';

export const register = (credentials) => {
	return axios
		.post('//localhost:8081/user/register', credentials)
		.then((token) => token)
		.catch((err) => err.response);
};
export const authorization = (userData) => {
	axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
};
export const clearAuthorization = () => {
	axios.defaults.headers.common['Authorization'] = null;
};
export const login = (credentials) => {
	return axios
		.post('//localhost:8081/user/login', credentials)
		.then((token) => token)
		.catch((err) => err.response);
};
export const checkToken = (callback) => {
	axios.interceptors.response.use(
		(response) => {
			console.log('error not detected');
			console.log(response);
			return response;
		},
		(error) => {
			if (error.response.status === 401) {
				callback('logout');
			}
			console.log('error detected');
			return Promise.reject(error);
		}
	);
};
export const verifySession = (userData) => {
	return axios
		.post('//localhost:8081/user/tokenverification', userData)
		.then((token) => token)
		.catch((err) => err.response);
};

export const getIpAddress = () => {
	return axios
		.get('https://api.ipify.org?format=json')
		.then((response) => response.data)
		.catch((error) => error);
};
