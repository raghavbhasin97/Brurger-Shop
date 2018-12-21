import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://my-burger-shop-d222f.firebaseio.com/'
});

export default instance;