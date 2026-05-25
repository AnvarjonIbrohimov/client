import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../api/axios';

export const useProducts = () => {
	console.log('🧠 HOOK ISHLADI');

	return useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			console.log('🔥 API CHAQIRILDI');

			const res = await axiosInstance.get('/product/all');

			console.log('📦 DATA:', res.data);

			return res.data;
		},
	});
};
