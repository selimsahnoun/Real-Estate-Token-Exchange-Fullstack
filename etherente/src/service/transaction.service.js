import axios from 'axios';

export const addTransaction = (from_address, to_address, tokens) => {
	return axios
		.post(`http://localhost:8081/transaction/addtransaction`, {
			from_address,
			to_address,
			tokens,
		})
		.then((response) => response)
		.catch((err) => console.log(err.response.data.errors));
};
export const fetchAllTransactions = () => {
	return axios
		.get(`http://localhost:8081/transaction/fetchalltransactions`, {
			from_address,
			to_address,
			tokens,
		})
		.then((response) => response)
		.catch((err) => console.log(err.response.data.errors));
};
