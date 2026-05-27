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

// src/libs/config.ts ga qo'shing:

export const getImageUrl = (path?: string, fallback?: string): string => {
	const defaultImg = fallback ?? 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80';
	if (!path) return defaultImg;
	if (path.startsWith('http')) return path; // ← Unsplash yoki boshqa URL
	return `${BASE_URL}${path}`; // ← lokal fayl /uploads/...
};
