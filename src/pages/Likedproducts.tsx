import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, CheckCircle, ArrowLeft } from 'lucide-react';
import { api, getImageUrl } from '../libs/config';
import { useOrders } from '../context/OrderContext';
import { useAuth } from '../context/AuthContext';
import { useLike } from '../hooks/useLike';
import '../css/LikedProducts.css';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ApiProduct {
	_id: string;
	productName: string;
	productPrice: number;
	productImages: string[];
	productCollection: string;
	productCategory: string;
	productDesc?: string;
	productSize?: string;
	productViews: number;
	productLeftCount: number;
}

type LikedProductItem = ApiProduct | { product?: ApiProduct };

const isApiProduct = (item: LikedProductItem): item is ApiProduct => {
	return '_id' in item;
};

// ─── API ──────────────────────────────────────────────────────────────────────
const fetchLikedProducts = async (): Promise<ApiProduct[]> => {
	const { data } = await api.get('/my-products');
	const items: Array<ApiProduct | { product?: ApiProduct }> = Array.isArray(data) ? data : (data.data ?? []);
	// ← product ichidan oling:
	return items.map((item) => (isApiProduct(item) ? item : item.product)).filter((item): item is ApiProduct => Boolean(item));
};
// ─── Badge colors ─────────────────────────────────────────────────────────────
const BADGE_COLORS: Record<string, string> = {
	POPULAR: '#FF6B35',
	NEW: '#1DB954',
	SALE: '#E63946',
	REGULAR: '#4A90D9',
};

// ─── LikedCard ────────────────────────────────────────────────────────────────
function LikedCard({ product, onUnlike }: { product: ApiProduct; onUnlike: () => void }) {
	const navigate = useNavigate();
	const { addOrder, isOrdered } = useOrders();
	const { token } = useAuth();
	const ordered = isOrdered(product._id);
	const { liked, toggleLike } = useLike('PRODUCT', product._id, token);

	const imageUrl = getImageUrl(product.productImages?.[0]);

	const badgeColor = BADGE_COLORS[product.productCollection] ?? '#888';

	const handleLike = async (e: React.MouseEvent) => {
		e.stopPropagation();
		await toggleLike();
		onUnlike(); // unlike qilinganda listdan olib tashlash
	};

	const handleCart = async (e: React.MouseEvent) => {
		e.stopPropagation();
		if (ordered) return;
		await addOrder({
			productId: product._id,
			name: product.productName,
			price: product.productPrice,
			image: imageUrl,
			collection: product.productCollection,
			category: product.productCategory,
			size: product.productSize,
		});
	};

	return (
		<div className="lk-card" onClick={() => navigate(`/product/${product._id}`)}>
			<div className="lk-card__img-wrap">
				<img src={imageUrl} alt={product.productName} className="lk-card__img" />

				<span className="lk-card__badge" style={{ background: badgeColor }}>
					{product.productCollection}
				</span>

				<div className="lk-card__actions">
					<button className={`lk-card__action-btn${liked ? ' liked' : ''}`} onClick={handleLike} aria-label="Unlike">
						<Heart size={14} strokeWidth={2} fill={liked ? 'currentColor' : 'none'} />
					</button>
				</div>
			</div>

			<div className="lk-card__content">
				<p className="lk-card__name">{product.productName}</p>
				{product.productDesc && <p className="lk-card__desc">{product.productDesc}</p>}
				<div className="lk-card__bottom">
					<span className="lk-card__price">${product.productPrice}</span>
					<button className={`lk-card__cart${ordered ? ' ordered' : ''}`} onClick={handleCart}>
						{ordered ? <CheckCircle size={13} strokeWidth={2.5} /> : <ShoppingCart size={13} strokeWidth={2.5} />}
					</button>
				</div>
			</div>
		</div>
	);
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function LikedCardSkeleton() {
	return (
		<div className="lk-card lk-card--skeleton">
			<div className="lk-skeleton__img" />
			<div className="lk-card__content">
				<div className="lk-skeleton__line lk-skeleton__line--long" />
				<div className="lk-skeleton__line lk-skeleton__line--short" />
				<div className="lk-skeleton__line lk-skeleton__line--med" />
			</div>
		</div>
	);
}

// ─── LikedProducts ────────────────────────────────────────────────────────────
function LikedProducts() {
	const navigate = useNavigate();

	const {
		data: products,
		isLoading,
		isError,
		refetch,
	} = useQuery({
		queryKey: ['liked-products'],
		queryFn: fetchLikedProducts,
	});

	const handleUnlike = () => {
		refetch();
	};

	return (
		<div className="lk-page">
			{/* ── Header ── */}
			<div className="lk-page__header">
				<button className="lk-page__back" onClick={() => navigate(-1)}>
					<ArrowLeft size={15} strokeWidth={2.5} />
					Back
				</button>
				<div>
					<h1 className="lk-page__title">Liked Products</h1>
					{products && <p className="lk-page__sub">{products.length} products</p>}
				</div>
			</div>

			{/* ── Grid ── */}
			<div className="lk-grid">
				{isLoading && Array.from({ length: 5 }).map((_, i) => <LikedCardSkeleton key={i} />)}

				{isError && <div className="lk-empty">Failed to load liked products.</div>}

				{!isLoading && !isError && products?.length === 0 && (
					<div className="lk-empty">
						<Heart size={36} strokeWidth={1.5} />
						<p>No liked products yet.</p>
						<button className="lk-empty__btn" onClick={() => navigate('/products')}>
							Browse Products
						</button>
					</div>
				)}

				{!isLoading && !isError && products?.map((p) => <LikedCard key={p._id} product={p} onUnlike={handleUnlike} />)}
			</div>
		</div>
	);
}

export default LikedProducts;
