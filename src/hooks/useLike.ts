import { useState, useEffect } from 'react';
import { api } from '../libs/config';

type TargetType = 'PRODUCT' | 'BRAND';

interface UseLikeReturn {
	liked: boolean;
	likeCount: number;
	toggleLike: () => Promise<void>;
	isLoading: boolean;
}

export function useLike(targetType: TargetType, targetId: string, token: string | null): UseLikeReturn {
	const [liked, setLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	// ── Fetch initial like status + count ──────────────────────────────────
	useEffect(() => {
		if (!targetId || !token) return;

		const fetchLikeData = async () => {
			try {
				// like count — { success: true, data: { likeCount: N } }
				const countRes = await api.get(`/count/${targetType}/${targetId}`);
				const count =
					countRes.data?.data?.likeCount ?? countRes.data?.likeCount ?? countRes.data?.count ?? countRes.data ?? 0;
				setLikeCount(typeof count === 'number' ? count : 0);

				// check if liked — { success: true, data: { isLiked: true/false } }
				const checkRes = await api.get(`/check/${targetType}/${targetId}`);
				const isLiked =
					checkRes.data?.data?.isLiked ?? checkRes.data?.isLiked ?? checkRes.data?.liked ?? checkRes.data ?? false;
				setLiked(Boolean(isLiked));
			} catch {
				// silently fail
			}
		};

		fetchLikeData();
	}, [targetId, targetType, token]);

	// ── Toggle like ────────────────────────────────────────────────────────
	const toggleLike = async () => {
		if (!token || isLoading) return;

		setIsLoading(true);

		// optimistic update
		const wasLiked = liked;
		setLiked(!wasLiked);
		setLikeCount((prev) => (wasLiked ? prev - 1 : prev + 1));

		try {
			await api.post('/toggle', { targetType, targetId });
		} catch {
			// rollback
			setLiked(wasLiked);
			setLikeCount((prev) => (wasLiked ? prev + 1 : prev - 1));
		} finally {
			setIsLoading(false);
		}
	};

	return { liked, likeCount, toggleLike, isLoading };
}
