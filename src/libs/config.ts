import axios from 'axios';

export const BASE_URL = 'http://localhost:3009';

export const api = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

// Har bir so'rovga token avtomatik qo'shiladi
api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
