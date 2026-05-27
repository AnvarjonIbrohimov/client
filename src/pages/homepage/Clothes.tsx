import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, ShoppingCart, ArrowRight, CheckCircle } from 'lucide-react';
import '../../css/home/Clothes.css';
import { useOrders } from '../../context/OrderContext';
import { useLike } from '../../hooks/useLike';
import { useAuth } from '../../context/AuthContext';
import { api, BASE_URL, getImageUrl } from '../../libs/config';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Product {
	_id: string;
	productName: string;
	productPrice: number;
	productImages: string[];
	productCollection: string;
	productCategory: string;
	productDesc?: string;
	productSize: string;
	productViews: number;
	productLeftCount: number;
}

// ─── API ──────────────────────────────────────────────────────────────────────
const fetchClothes = async (): Promise<Product[]> => {
	const { data } = await api.get('/product/all');
	const all = (Array.isArray(data) ? data : (data.data ?? [])).filter((p: Product) =>
		['MEN', 'WOMEN', 'KIDS'].includes(p.productCategory),
	);
	// shuffle
	const shuffled = all.sort(() => Math.random() - 0.5);
	return shuffled.slice(0, 5);
};

// ─── Category badge color ─────────────────────────────────────────────────────
const CAT_COLORS: Record<string, string> = {
	MEN: '#3b82f6',
	WOMEN: '#ec4899',
	KIDS: '#f59e0b',
};

// ─── ProductCard ──────────────────────────────────────────────────────────────
function ClothesCard({ product }: { product: Product }) {
	const navigate = useNavigate();
	const [views, setViews] = useState(product.productViews ?? 0);
	const { addOrder, isOrdered } = useOrders();
	const ordered = isOrdered(product._id as any);
	const { token } = useAuth();
	const { liked, likeCount, toggleLike } = useLike('PRODUCT', product._id, token);

	const imageUrl = getImageUrl(product.productImages?.[0]);

	const handleLike = (e: React.MouseEvent) => {
		e.stopPropagation();
		toggleLike();
	};

	const handleView = (e: React.MouseEvent) => {
		e.stopPropagation();
		setViews((v) => v + 1);
		navigate(`/product/${product._id}`);
	};

	const handleCart = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (ordered) return;
		addOrder({
			productId: product._id as any,
			name: product.productName,
			price: product.productPrice,
			image: `${BASE_URL}${product.productImages?.[0] ?? ''}`,
			collection: product.productCollection,
			category: product.productCategory,
			size: product.productSize,
		});
	};

	const catColor = CAT_COLORS[product.productCategory] ?? '#6b7280';

	return (
		<div className="cl-card" onClick={() => navigate(`/product/${product._id}`)}>
			{/* Image */}
			<div className="cl-card__img-wrap">
				<img src={imageUrl} alt={product.productName} className="cl-card__img" />

				{/* Category badge */}
				<span className="cl-card__cat" style={{ background: catColor }}>
					{product.productCategory}
				</span>

				{/* Collection badge */}
				<span className="cl-card__coll">{product.productCollection}</span>

				{/* Hover actions */}
				<div className="cl-card__actions">
					<button className={`cl-card__action-btn${liked ? ' liked' : ''}`} onClick={handleLike}>
						<Heart size={14} strokeWidth={2} fill={liked ? 'currentColor' : 'none'} />
						{likeCount > 0 && <span>{likeCount}</span>}
					</button>
					<button className="cl-card__action-btn" onClick={handleView} aria-label="View">
						<Eye size={14} strokeWidth={2} />
						<span>{views}</span>
					</button>
				</div>
			</div>

			{/* Content */}
			<div className="cl-card__content">
				<p className="cl-card__name">{product.productName}</p>
				{product.productDesc && <p className="cl-card__desc">{product.productDesc}</p>}
				<div className="cl-card__bottom">
					<span className="cl-card__price">{product.productPrice.toLocaleString()} $</span>
					<button className={`cl-card__cart${ordered ? ' ordered' : ''}`} onClick={handleCart} aria-label="Add to cart">
						{ordered ? <CheckCircle size={13} strokeWidth={2.5} /> : <ShoppingCart size={13} strokeWidth={2.5} />}
					</button>
				</div>
			</div>
		</div>
	);
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function ClothesCardSkeleton() {
	return (
		<div className="cl-card cl-card--skeleton">
			<div className="cl-card__img-wrap cl-skeleton__img" />
			<div className="cl-card__content">
				<div className="cl-skeleton__line cl-skeleton__line--long" />
				<div className="cl-skeleton__line cl-skeleton__line--short" />
				<div className="cl-skeleton__line cl-skeleton__line--med" />
			</div>
		</div>
	);
}

// ─── Clothes ──────────────────────────────────────────────────────────────────
function Clothes() {
	const navigate = useNavigate();

	const {
		data: products,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['clothes'],
		queryFn: fetchClothes,
	});

	return (
		<section className="clothes-section">
			{/* Header */}
			<div className="clothes-section__header">
				<div>
					<h2 className="clothes-section__title">Clothes Collection</h2>
					<p className="clothes-section__sub">Men · Women · Kids</p>
				</div>
				<button className="clothes-section__more" onClick={() => navigate('/products')}>
					View all
					<ArrowRight size={14} strokeWidth={2.5} />
				</button>
			</div>

			{/* Grid */}
			<div className="clothes-grid">
				{isLoading && Array.from({ length: 5 }).map((_, i) => <ClothesCardSkeleton key={i} />)}

				{isError && <div className="clothes-error">Failed to load products. Please try again.</div>}

				{!isLoading && !isError && products?.map((p) => <ClothesCard key={p._id} product={p} />)}

				{!isLoading && !isError && products?.length === 0 && <div className="clothes-empty">No clothes found.</div>}
			</div>
		</section>
	);
}

export default Clothes;
