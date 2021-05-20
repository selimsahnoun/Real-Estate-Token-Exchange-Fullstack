import axios from 'axios';

export const getHousesList = () => {
	return axios
		.get(`http://localhost:8081/house/houseslist`)
		.then((response) => response);
};
export const getHouseDetails = (id) => {
	return axios
		.get(`http://localhost:8081/house/houseslist/${id}`)
		.then((response) => {
			return response;
		});
};

export const checkPicture = (pictureUrl) => {
	return axios
		.get(pictureUrl)
		.then(() => pictureUrl)
		.catch(() => '../../assets/pictures/DummyHouse.jpg');
};
