import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../libs/config';

type TargetType = 'PRODUCT' | 'BRAND';

interface UseLikeReturn {
	liked: boolean;
	likeCount: number;
	toggleLike: () => Promise<void>;
	isLoading: boolean;
}
// useLike.ts
export function useLike(targetType: TargetType, targetId: string, token: string | null): UseLikeReturn {
	const [liked, setLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);


	const headers = {
		Authorization: token ? `Bearer ${token}` : '',
	};

	// ── Fetch initial like status + count ──────────────────────────────────
	useEffect(() => {
		if (!targetId) return;

		const fetchLikeData = async () => {
			try {
				// like count
				const countRes = await axios.get(`${BASE_URL}/count/${targetType}/${targetId}`, { headers });
				setLikeCount(countRes.data?.count ?? countRes.data ?? 0);

				// check if user liked
				if (token) {
					const checkRes = await axios.get(`${BASE_URL}/check/${targetType}/${targetId}`, { headers });
					setLiked(checkRes.data?.liked ?? checkRes.data ?? false);
				}
			} catch {
				// silently fail — like is not critical
			}
		};

		fetchLikeData();
	}, [targetId, targetType]);

	// ── Toggle like ────────────────────────────────────────────────────────
	const toggleLike = async () => {
		if (!token || isLoading) return;

		setIsLoading(true);

		// optimistic update
		const wasLiked = liked;
		setLiked(!wasLiked);
		setLikeCount((prev) => (wasLiked ? prev - 1 : prev + 1));

		try {
			await axios.post(`${BASE_URL}/toggle`, { targetType, targetId }, { headers });
		} catch {
			// rollback on error
			setLiked(wasLiked);
			setLikeCount((prev) => (wasLiked ? prev + 1 : prev - 1));
		} finally {
			setIsLoading(false);
		}
	};

	return { liked, likeCount, toggleLike, isLoading };
}
