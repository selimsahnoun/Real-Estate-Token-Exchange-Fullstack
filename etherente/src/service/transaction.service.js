import axios from 'axios';

export const addTransaction = (from_address, to_address, tokens) => {
	return axios
		.post(`/transaction/addtransaction`, {
			from_address,
			to_address,
			tokens,
		})
		.then((response) => response)
		.catch((err) => console.log(err.response.data.errors));
};
export const fetchAllAddresses = () => {
	return axios
		.get(`/transaction/fetchalladdresses`)
		.then((response) => response.data.allAddresses)
		.catch((err) => console.log(err.response.data.errors));
};
export const addSellOffer = (seller, amount, price) => {
	return axios
		.post(`/transaction/addselloffer`, {
			seller,
			amount,
			price,
		})
		.then((response) => response)
		.catch((err) => console.log(err.response.data.errors));
};
export const fetchAllOffers = () => {
	return axios
		.get(`/transaction/fetchalloffers`)
		.then((response) => response.data.allOffers)
		.catch((err) => console.log(err.response.data.errors));
};
