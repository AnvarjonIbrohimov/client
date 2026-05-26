import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
import '../css/Productdetail.css';
import type { Product } from '../types/product';
import { ProductCategory, ProductCollection, ProductSize } from '../enums/prodcut.enum';

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
	{
		id: 1,
		name: 'Classic Hoodie',
		price: 89000,
		images: [
			'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
			'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
			'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
			'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
		],
		collection: ProductCollection.POPULAR,
		category: ProductCategory.MEN,
		sizes: [ProductSize.S, ProductSize.M, ProductSize.L, ProductSize.XL],
		description:
			'A premium classic hoodie crafted from soft cotton blend fabric. Perfect for everyday wear with its relaxed fit and comfortable feel. Features a front pocket and adjustable drawstring hood.',
		rating: 4.8,
		reviews: 124,
		inStock: true,
	},
	{
		id: 2,
		name: 'Slim Fit Jeans',
		price: 120000,
		images: [
			'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
			'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80',
			'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
		],
		collection: ProductCollection.NEW,
		category: ProductCategory.MEN,
		sizes: [ProductSize.M, ProductSize.L, ProductSize.XL],
		description:
			'Modern slim fit jeans with a comfortable stretch fabric. Classic 5-pocket design with a clean finish that pairs well with any outfit.',
		rating: 4.6,
		reviews: 89,
		inStock: true,
	},
	{
		id: 3,
		name: 'Floral Dress',
		price: 95000,
		images: [
			'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80',
			'https://images.unsplash.com/photo-1594938298603-c8148c4b4c5b?w=600&q=80',
			'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&q=80',
		],
		collection: ProductCollection.NEW,
		category: ProductCategory.WOMEN,
		sizes: [ProductSize.XS, ProductSize.S, ProductSize.M],
		description:
			'A beautiful floral print dress perfect for spring and summer. Lightweight fabric with a flattering A-line silhouette and hidden side zipper.',
		rating: 4.9,
		reviews: 201,
		inStock: true,
	},
	{
		id: 4,
		name: 'Leather Jacket',
		price: 250000,
		images: [
			'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
			'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
			'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=80',
		],
		collection: ProductCollection.POPULAR,
		category: ProductCategory.WOMEN,
		sizes: [ProductSize.S, ProductSize.M],
		description:
			'Premium genuine leather jacket with a classic biker style. Features asymmetric zipper, multiple pockets, and a sleek lining for a sophisticated look.',
		rating: 4.7,
		reviews: 67,
		inStock: true,
	},
	{
		id: 5,
		name: 'Kids Sneakers',
		price: 65000,
		images: [
			'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
			'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
		],
		collection: ProductCollection.SALE,
		category: ProductCategory.KIDS,
		sizes: [ProductSize.XS, ProductSize.S],
		description:
			'Durable and comfortable sneakers designed for active kids. Lightweight construction with non-slip sole and easy velcro closure.',
		rating: 4.5,
		reviews: 45,
		inStock: true,
	},
	{
		id: 6,
		name: 'Mini Backpack',
		price: 78000,
		images: [
			'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
			'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
			'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
		],
		collection: ProductCollection.POPULAR,
		category: ProductCategory.KIDS,
		sizes: [ProductSize.M],
		description:
			'Cute and functional mini backpack perfect for school or outings. Padded shoulder straps, multiple compartments, and durable water-resistant material.',
		rating: 4.4,
		reviews: 33,
		inStock: true,
	},
	{
		id: 7,
		name: 'Wireless Earbuds',
		price: 199000,
		images: [
			'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
			'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80',
			'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
		],
		collection: ProductCollection.NEW,
		category: ProductCategory.ELECTRONICS,
		description:
			'True wireless earbuds with active noise cancellation and 30-hour battery life. Premium sound quality with deep bass and crystal-clear highs.',
		rating: 4.8,
		reviews: 312,
		inStock: true,
	},
	{
		id: 8,
		name: 'Smart Watch',
		price: 450000,
		images: [
			'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
			'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&q=80',
			'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80',
		],
		collection: ProductCollection.POPULAR,
		category: ProductCategory.ELECTRONICS,
		description:
			'Feature-packed smartwatch with health monitoring, GPS, and 7-day battery. Water resistant up to 50m with a stunning AMOLED display.',
		rating: 4.9,
		reviews: 445,
		inStock: true,
	},
	{
		id: 9,
		name: 'Atomic Habits',
		price: 45000,
		images: [
			'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
			'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80',
		],
		collection: ProductCollection.POPULAR,
		category: ProductCategory.BOOKS,
		description:
			'The #1 New York Times bestseller. A revolutionary system to get 1% better every day. James Clear shares proven strategies for habit formation.',
		rating: 4.9,
		reviews: 1240,
		inStock: true,
	},
	{
		id: 10,
		name: 'Clean Code',
		price: 55000,
		images: [
			'https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&q=80',
			'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
		],
		collection: ProductCollection.REGULAR,
		category: ProductCategory.BOOKS,
		description:
			'A handbook of agile software craftsmanship by Robert C. Martin. Learn to write clean, readable, and maintainable code with practical examples.',
		rating: 4.7,
		reviews: 876,
		inStock: true,
	},
];

const BADGE_COLORS: Record<ProductCollection, string> = {
	[ProductCollection.POPULAR]: '#FF6B35',
	[ProductCollection.NEW]: '#1DB954',
	[ProductCollection.SALE]: '#E63946',
	[ProductCollection.REGULAR]: '#4A90D9',
};

// ─── ImageGallery ─────────────────────────────────────────────────────────────
function ImageGallery({ images, name }: { images: string[]; name: string }) {
	const [current, setCurrent] = useState(0);

	const prev = () => setCurrent((i) => (i === 0 ? images.length - 1 : i - 1));
	const next = () => setCurrent((i) => (i === images.length - 1 ? 0 : i + 1));

	return (
		<div className="pd-gallery">
			{/* Main image */}
			<div className="pd-gallery__main">
				<img src={images[current]} alt={`${name} ${current + 1}`} className="pd-gallery__img" />

				{images.length > 1 && (
					<>
						<button className="pd-gallery__arrow pd-gallery__arrow--left" onClick={prev} aria-label="Previous">
							<ChevronLeft size={20} strokeWidth={2.5} />
						</button>
						<button className="pd-gallery__arrow pd-gallery__arrow--right" onClick={next} aria-label="Next">
							<ChevronRight size={20} strokeWidth={2.5} />
						</button>
						<div className="pd-gallery__dots">
							{images.map((_, i) => (
								<button
									key={i}
									className={`pd-gallery__dot${i === current ? ' active' : ''}`}
									onClick={() => setCurrent(i)}
									aria-label={`Image ${i + 1}`}
								/>
							))}
						</div>
					</>
				)}
			</div>

			{/* Thumbnails */}
			{images.length > 1 && (
				<div className="pd-gallery__thumbs">
					{images.map((img, i) => (
						<button
							key={i}
							className={`pd-gallery__thumb${i === current ? ' active' : ''}`}
							onClick={() => setCurrent(i)}
						>
							<img src={img} alt={`${name} ${i + 1}`} />
						</button>
					))}
				</div>
			)}
		</div>
	);
}

// ─── RelatedCard ──────────────────────────────────────────────────────────────
function RelatedCard({ product }: { product: Product }) {
	const navigate = useNavigate();

	return (
		<div
			className="pd-related-card"
			onClick={() => {
				navigate(`/products/${product.id}`);
				window.scrollTo(0, 0);
			}}
		>
			<div className="pd-related-card__img-wrap">
				<img src={product.images?.[0] ?? product.image ?? ''} alt={product.name} />
				<span className="pd-related-card__badge" style={{ background: BADGE_COLORS[product.collection] }}>
					{product.collection}
				</span>
			</div>
			<div className="pd-related-card__info">
				<p className="pd-related-card__name">{product.name}</p>
				<p className="pd-related-card__price">{product.price.toLocaleString()} so'm</p>
			</div>
		</div>
	);
}

// ─── ProductDetail ────────────────────────────────────────────────────────────
function ProductDetail() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { addOrder, isOrdered } = useOrders();

	const product = PRODUCTS.find((p) => p.id === Number(id));

	const [selectedSize, setSelectedSize] = useState<ProductSize | null>(product?.sizes?.[0] ?? null);
	const [liked, setLiked] = useState(false);
	const [added, setAdded] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [id]);

	if (!product) {
		return (
			<div className="pd-not-found">
				<p>Product not found.</p>
				<button onClick={() => navigate('/products')}>← Back to products</button>
			</div>
		);
	}

	const ordered = isOrdered(product.id);
	const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 5);

	const handleCart = () => {
		if (ordered || added) return;
		addOrder({
			productId: product.id,
			name: product.name,
			price: product.price,
			image: product.images?.[0] ?? product.image ?? '',
			collection: product.collection,
			category: product.category,
			size: selectedSize ?? undefined,
		});
		setAdded(true);
	};

	return (
		<div className="pd-page">
			{/* ── Breadcrumb ── */}
			<div className="pd-breadcrumb">
				<button className="pd-back" onClick={() => navigate('/products')}>
					<ArrowLeft size={15} strokeWidth={2.5} />
					Back
				</button>
				<span className="pd-breadcrumb__sep">/</span>
				<Link to="/products" className="pd-breadcrumb__link">
					Products
				</Link>
				<span className="pd-breadcrumb__sep">/</span>
				<span className="pd-breadcrumb__current">{product.name}</span>
			</div>

			{/* ── Main ── */}
			<div className="pd-main">
				{/* Gallery */}
				<ImageGallery images={product.images ?? [product.image ?? '']} name={product.name} />

				{/* Info */}
				<div className="pd-info">
					{/* Badge + name */}
					<div className="pd-info__top">
						<span
							className="pd-collection-badge"
							style={{
								background: BADGE_COLORS[product.collection] + '18',
								color: BADGE_COLORS[product.collection],
								borderColor: BADGE_COLORS[product.collection] + '35',
							}}
						>
							<Tag size={11} strokeWidth={2.5} />
							{product.collection}
						</span>
						<button
							className={`pd-wishlist${liked ? ' active' : ''}`}
							onClick={() => setLiked((v) => !v)}
							aria-label="Wishlist"
						>
							<Heart size={16} strokeWidth={2} fill={liked ? 'currentColor' : 'none'} />
						</button>
					</div>

					<h1 className="pd-name">{product.name}</h1>

					{/* Rating */}
					<div className="pd-rating">
						<div className="pd-rating__stars">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star
									key={i}
									size={13}
									strokeWidth={0}
									fill={i < Math.floor(product.rating ?? 0) ? '#f59e0b' : '#e5e7eb'}
								/>
							))}
						</div>
						<span className="pd-rating__score">{product.rating}</span>
						<span className="pd-rating__count">({product.reviews} reviews)</span>
					</div>

					{/* Price */}
					<div className="pd-price">
						{product.price.toLocaleString()}
						<span className="pd-price__unit"> so'm</span>
					</div>

					{/* Description */}
					<p className="pd-description">{product.description}</p>

					{/* Size selector */}
					{product.sizes && product.sizes.length > 0 && (
						<div className="pd-sizes">
							<p className="pd-sizes__label">
								Size
								{selectedSize && <span className="pd-sizes__selected">{selectedSize}</span>}
							</p>
							<div className="pd-sizes__row">
								{product.sizes.map((size) => (
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

					{/* Actions */}
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

			{/* ── Related products ── */}
			{related.length > 0 && (
				<div className="pd-related">
					<h2 className="pd-related__title">Related Products</h2>
					<div className="pd-related__grid">
						{related.map((p) => (
							<RelatedCard key={p.id} product={p} />
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default ProductDetail;
