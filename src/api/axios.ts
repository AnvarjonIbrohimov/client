import axios from 'axios';
import { BASE_URL } from '../libs/config';

const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default api;
export const axiosInstance = api;
