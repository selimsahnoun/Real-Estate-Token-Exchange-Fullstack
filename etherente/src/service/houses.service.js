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
		.catch(
			() =>
				'https://firebasestorage.googleapis.com/v0/b/etherente.appspot.com/o/dummyHouse.jpg?alt=media&token=d7f28f4b-18fa-478c-a8d1-5b6a5b99be6a'
		);
};
