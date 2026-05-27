import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../libs/config';
import {
	ArrowLeft,
	Heart,
	ShoppingCart,
	Star,
	Truck,
	RefreshCw,
	ShieldCheck,
	ChevronLeft,
	ChevronRight,
	Tag,
	CheckCircle,
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useLike } from '../hooks/useLike';
import { BASE_URL } from '../libs/config';
import '../css/Productdetail.css';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ApiProduct {
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
	productStatus: string;
	createdAt: string;
}

// ─── Badge colors ─────────────────────────────────────────────────────────────
const BADGE_COLORS: Record<string, string> = {
	POPULAR: '#FF6B35',
	NEW: '#1DB954',
	SALE: '#E63946',
	REGULAR: '#4A90D9',
};

const CAT_COLORS: Record<string, string> = {
	MEN: '#3b82f6',
	WOMEN: '#ec4899',
	KIDS: '#f59e0b',
	ELECTRONICS: '#8b5cf6',
	BOOKS: '#10b981',
};

// ─── ImageGallery ─────────────────────────────────────────────────────────────
function ImageGallery({ images, name }: { images: string[]; name: string }) {
	const [current, setCurrent] = useState(0);

	const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
	const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

	const imgUrl = (path: string) => (path.startsWith('http') ? path : `${BASE_URL}${path}`);

	return (
		<div className="pd-gallery">
			<div className="pd-gallery__main">
				<img src={imgUrl(images[current])} alt={`${name} ${current + 1}`} className="pd-gallery__img" />
				{images.length > 1 && (
					<>
						<button className="pd-gallery__arrow pd-gallery__arrow--left" onClick={prev}>
							<ChevronLeft size={20} strokeWidth={2.5} />
						</button>
						<button className="pd-gallery__arrow pd-gallery__arrow--right" onClick={next}>
							<ChevronRight size={20} strokeWidth={2.5} />
						</button>
						<div className="pd-gallery__dots">
							{images.map((_, i) => (
								<button
									key={i}
									className={`pd-gallery__dot${i === current ? ' active' : ''}`}
									onClick={() => setCurrent(i)}
								/>
							))}
						</div>
					</>
				)}
			</div>

			{images.length > 1 && (
				<div className="pd-gallery__thumbs">
					{images.map((img, i) => (
						<button
							key={i}
							className={`pd-gallery__thumb${i === current ? ' active' : ''}`}
							onClick={() => setCurrent(i)}
						>
							<img src={imgUrl(img)} alt={`${name} ${i + 1}`} />
						</button>
					))}
				</div>
			)}
		</div>
	);
}

// ─── RelatedCard ──────────────────────────────────────────────────────────────
function RelatedCard({ product }: { product: ApiProduct }) {
	const navigate = useNavigate();
	const imgUrl = product.productImages?.[0] ? `${BASE_URL}${product.productImages[0]}` : '';

	return (
		<div
			className="pd-related-card"
			onClick={() => {
				navigate(`/products/${product._id}`);
				window.scrollTo(0, 0);
			}}
		>
			<div className="pd-related-card__img-wrap">
				<img src={imgUrl} alt={product.productName} />
				<span
					className="pd-related-card__badge"
					style={{ background: BADGE_COLORS[product.productCollection] ?? '#888' }}
				>
					{product.productCollection}
				</span>
			</div>
			<div className="pd-related-card__info">
				<p className="pd-related-card__name">{product.productName}</p>
				<p className="pd-related-card__price">${product.productPrice}</p>
			</div>
		</div>
	);
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function DetailSkeleton() {
	return (
		<div className="pd-skeleton">
			<div className="pd-skeleton__gallery" />
			<div className="pd-skeleton__info">
				<div className="pd-skeleton__line pd-skeleton__line--short" />
				<div className="pd-skeleton__line pd-skeleton__line--long" />
				<div className="pd-skeleton__line pd-skeleton__line--med" />
				<div className="pd-skeleton__line pd-skeleton__line--long" />
				<div className="pd-skeleton__line pd-skeleton__line--short" />
			</div>
		</div>
	);
}

// ─── ProductDetail ────────────────────────────────────────────────────────────
function ProductDetail() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { addOrder, isOrdered } = useOrders();
	// ProductDetail.tsx da:
	const { token } = useAuth();
	const { liked, likeCount, toggleLike } = useLike('PRODUCT', id ?? '', token);

	const [selectedSize, setSelectedSize] = useState<string | null>(null);
	const [added, setAdded] = useState(false);

	// fetch product
	const {
		data: product,
		isLoading,
		isError,
	} = useQuery<ApiProduct>({
		queryKey: ['product', id],
		queryFn: async () => {
			const token = localStorage.getItem('token');
			const { data } = await axios.get(`${BASE_URL}/product/${id}`, {
				headers: {
					Authorization: token ? `Bearer ${token}` : '',
				},
			});
			return data.data ?? data;
		},
		enabled: !!id,
	});

	// fetch related products
	const { data: allProducts } = useQuery<ApiProduct[]>({
		queryKey: ['products-all'],
		queryFn: async () => {
			const { data } = await api.get(`/product/${id}`);
			return Array.isArray(data) ? data : (data.data ?? []);
		},
	});

	useEffect(() => {
		window.scrollTo(0, 0);
		setAdded(false);
		setSelectedSize(null);
	}, [id]);

	// set default size
	useEffect(() => {
		if (product?.productSize) setSelectedSize(product.productSize);
	}, [product]);

	if (isLoading)
		return (
			<div className="pd-page">
				<DetailSkeleton />
			</div>
		);

	if (isError || !product) {
		return (
			<div className="pd-not-found">
				<p>Product not found.</p>
				<button onClick={() => navigate('/products')}>← Back to products</button>
			</div>
		);
	}

	const ordered = isOrdered(product._id as any);
	const related = (Array.isArray(allProducts) ? allProducts : [])
		.filter((p) => p.productCategory === product.productCategory && p._id !== product._id)
		.slice(0, 5);

	const badgeColor = BADGE_COLORS[product.productCollection] ?? '#888';
	const catColor = CAT_COLORS[product.productCategory] ?? '#888';

	const handleCart = () => {
		if (ordered || added) return;
		addOrder({
			productId: product._id as any,
			name: product.productName,
			price: product.productPrice,
			image: product.productImages?.[0] ? `${BASE_URL}${product.productImages[0]}` : '',
			collection: product.productCollection,
			category: product.productCategory,
			size: selectedSize ?? undefined,
		});
		setAdded(true);
	};

	return (
		<div className="pd-page">
			{/* ── Breadcrumb ── */}
			<div className="pd-breadcrumb">
				<button className="pd-back" onClick={() => navigate(-1)}>
					<ArrowLeft size={15} strokeWidth={2.5} />
					Back
				</button>
				<span className="pd-breadcrumb__sep">/</span>
				<Link to="/products" className="pd-breadcrumb__link">
					Products
				</Link>
				<span className="pd-breadcrumb__sep">/</span>
				<span className="pd-breadcrumb__current">{product.productName}</span>
			</div>

			{/* ── Main ── */}
			<div className="pd-main">
				{/* Gallery */}
				<ImageGallery images={product.productImages ?? []} name={product.productName} />

				{/* Info */}
				<div className="pd-info">
					{/* Top badges */}
					<div className="pd-info__top">
						<div style={{ display: 'flex', gap: 8 }}>
							<span
								className="pd-collection-badge"
								style={{
									background: badgeColor + '18',
									color: badgeColor,
									borderColor: badgeColor + '40',
								}}
							>
								<Tag size={11} strokeWidth={2.5} />
								{product.productCollection}
							</span>
							<span
								className="pd-collection-badge"
								style={{
									background: catColor + '18',
									color: catColor,
									borderColor: catColor + '40',
								}}
							>
								{product.productCategory}
							</span>
						</div>

						{/* Wishlist */}
						<button
							className={`pd-wishlist${liked ? ' active' : ''}`}
							onClick={() => toggleLike()}
							aria-label="Wishlist"
						>
							<Heart size={16} strokeWidth={2} fill={liked ? 'currentColor' : 'none'} />
							{likeCount > 0 && <span style={{ fontSize: 11, fontWeight: 700 }}>{likeCount}</span>}
						</button>
					</div>

					<h1 className="pd-name">{product.productName}</h1>

					{/* Views */}
					<div className="pd-rating">
						<div className="pd-rating__stars">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star key={i} size={13} strokeWidth={0} fill={i < 4 ? '#f59e0b' : '#e5e7eb'} />
							))}
						</div>
						<span className="pd-rating__count">{product.productViews} views</span>
						{product.productLeftCount <= 10 && (
							<span style={{ fontSize: 11, color: '#ef4444', fontWeight: 600 }}>
								Only {product.productLeftCount} left!
							</span>
						)}
					</div>

					{/* Price */}
					<div className="pd-price">${product.productPrice}</div>

					{/* Description */}
					{product.productDesc && <p className="pd-description">{product.productDesc}</p>}

					{/* Size */}
					{product.productSize && (
						<div className="pd-sizes">
							<p className="pd-sizes__label">
								Size
								{selectedSize && <span className="pd-sizes__selected">{selectedSize}</span>}
							</p>
							<div className="pd-sizes__row">
								{['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
									<button
										key={size}
										className={`pd-size-btn${selectedSize === size ? ' active' : ''}`}
										onClick={() => setSelectedSize(size)}
									>
										{size}
									</button>
								))}
							</div>
						</div>
					)}

					{/* Cart */}
					<div className="pd-actions">
						<button
							className={`pd-cart-btn${added || ordered ? ' added' : ''}`}
							onClick={handleCart}
							disabled={added || ordered}
						>
							{added || ordered ? (
								<>
									<CheckCircle size={16} strokeWidth={2.5} /> Added to cart
								</>
							) : (
								<>
									<ShoppingCart size={16} strokeWidth={2.5} /> Add to cart
								</>
							)}
						</button>
					</div>

					{/* Perks */}
					<div className="pd-perks">
						<div className="pd-perk">
							<Truck size={14} strokeWidth={2} />
							<span>Free shipping on orders over $50</span>
						</div>
						<div className="pd-perk">
							<RefreshCw size={14} strokeWidth={2} />
							<span>Free returns within 30 days</span>
						</div>
						<div className="pd-perk">
							<ShieldCheck size={14} strokeWidth={2} />
							<span>Secure checkout guaranteed</span>
						</div>
					</div>
				</div>
			</div>

			{/* ── Related ── */}
			{related.length > 0 && (
				<div className="pd-related">
					<h2 className="pd-related__title">Related Products</h2>
					<div className="pd-related__grid">
						{related.map((p) => (
							<RelatedCard key={p._id} product={p} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductDetail;
