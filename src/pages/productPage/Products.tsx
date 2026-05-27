import { useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, CheckCircle } from 'lucide-react';
import { api, BASE_URL } from '../../libs/config';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { useLike } from '../../hooks/useLike';
import { BADGE_COLORS, CATEGORIES, COLLECTIONS, SIZE_CATEGORIES } from '../../types/product';
import { ProductCategory, ProductCollection, ProductSize } from '../../enums/prodcut.enum';
import '../../css/products/product.css';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ApiProduct {
	_id: string;
	productName: string;
	productPrice: number;
	productImages: string[];
	productCollection: ProductCollection;
	productCategory: ProductCategory;
	productSize?: ProductSize;
	productDesc?: string;
	productViews: number;
	productLeftCount: number;
	productStatus: string;
}

// ─── API fetch ────────────────────────────────────────────────────────────────
const fetchProducts = async (): Promise<ApiProduct[]> => {
	const { data } = await api.get('/product/all');
	return Array.isArray(data) ? data : (data.data ?? []);
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function ProductSkeleton() {
	return (
		<div className="p-card p-card--skeleton">
			<div className="p-skeleton__img" />
			<div className="p-card__content">
				<div className="p-skeleton__line p-skeleton__line--long" />
				<div className="p-skeleton__line p-skeleton__line--short" />
			</div>
		</div>
	);
}

// ─── ProductCard ──────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: ApiProduct }) {
	const navigate = useNavigate();
	const { addOrder, isOrdered } = useOrders();
	const { token } = useAuth();
	const ordered = isOrdered(product._id as any);
	const { liked, toggleLike } = useLike('PRODUCT', product._id, token);

	const imageUrl = product.productImages?.[0]
		? `${BASE_URL}${product.productImages[0]}`
		: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80';

	const badgeColor = BADGE_COLORS[product.productCollection] ?? '#888';

	const handleCart = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (ordered) return;
		addOrder({
			productId: product._id as any,
			name: product.productName,
			price: product.productPrice,
			image: imageUrl,
			collection: product.productCollection,
			category: product.productCategory,
			size: product.productSize,
		});
	};

	const handleLike = (e: React.MouseEvent) => {
		e.stopPropagation();
		toggleLike();
	};

	return (
		<div className="p-card" onClick={() => navigate(`/product/${product._id}`)}>
			<div className="p-card__image-box">
				<img src={imageUrl} alt={product.productName} />

				<span className="p-card__badge" style={{ backgroundColor: badgeColor }}>
					{product.productCollection}
				</span>

				<div className="p-card__icons">
					<button className={`p-card__icon-btn${liked ? ' active-like' : ''}`} onClick={handleLike} aria-label="Like">
						<Heart size={12} strokeWidth={2} fill={liked ? 'currentColor' : 'none'} />
					</button>
				</div>
			</div>

			<div className="p-card__content">
				<h3 className="p-card__name">{product.productName}</h3>
				<div className="p-card__bottom">
					<span className="p-card__price">${product.productPrice}</span>
					<button
						className={`p-card__cart-btn${ordered ? ' p-card__cart-btn--ordered' : ''}`}
						onClick={handleCart}
						disabled={ordered}
					>
						{ordered ? (
							<>
								<CheckCircle size={11} strokeWidth={2.5} /> Added
							</>
						) : (
							<>
								<ShoppingCart size={11} strokeWidth={2.5} /> Cart
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}

// ─── Products ─────────────────────────────────────────────────────────────────
function Products() {
	const [searchQuery, setSearchQuery] = useState('');
	const [searchInput, setSearchInput] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(ProductCategory.MEN);
	const [selectedCollection, setSelectedCollection] = useState<ProductCollection>(ProductCollection.POPULAR);
	const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
	const searchRef = useRef<HTMLInputElement>(null);

	const showSizes = SIZE_CATEGORIES.has(selectedCategory);

	const {
		data: allProducts,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['products-all'],
		queryFn: fetchProducts,
	});

	const handleCategoryChange = (cat: ProductCategory) => {
		setSelectedCategory(cat);
		setSelectedSize(null);
	};

	const handleSizeClick = (size: ProductSize) => {
		setSelectedSize((prev) => (prev === size ? null : size));
	};

	const handleSearch = () => {
		setSearchQuery(searchInput.trim());
	};

	// filter
	const filtered = (Array.isArray(allProducts) ? allProducts : []).filter((p) => {
		if (p.productCategory !== selectedCategory) return false;
		if (p.productCollection !== selectedCollection) return false;
		if (searchQuery && !p.productName.toLowerCase().includes(searchQuery.toLowerCase())) return false;
		if (selectedSize && p.productSize !== selectedSize) return false;
		if (p.productStatus === 'HIDDEN') return false;
		return true;
	});

	return (
		<div className="products-page">
			{/* ── Header ── */}
			<header className="products-header">
				<div className="products-header__brand">
					<span className="products-header__logo">
						SMART<span className="products-header__dash">—</span>STORE
					</span>
					<span className="products-header__sub">Online-shop</span>
				</div>

				<div className="products-header__search">
					<input
						ref={searchRef}
						type="text"
						placeholder="Type here"
						value={searchInput}
						onChange={(e) => setSearchInput(e.target.value)}
						onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
						className="products-header__input"
					/>
					<button className="products-header__search-btn" onClick={handleSearch}>
						SEARCH
					</button>
				</div>
			</header>

			{/* ── Category tabs ── */}
			<nav className="products-categories">
				{CATEGORIES.map(({ value, label }) => (
					<button
						key={value}
						className={`products-categories__btn${selectedCategory === value ? ' active' : ''}`}
						onClick={() => handleCategoryChange(value)}
					>
						{label}
					</button>
				))}
			</nav>

			{/* ── Size filter ── */}
			<div className={`products-sizes${showSizes ? ' visible' : ''}`}>
				<span className="products-sizes__label">Size</span>
				{Object.values(ProductSize).map((size) => (
					<button
						key={size}
						className={`products-sizes__btn${selectedSize === size ? ' active' : ''}`}
						onClick={() => handleSizeClick(size)}
					>
						{size}
					</button>
				))}
			</div>

			<div className="products-divider" />

			{/* ── Main ── */}
			<div className="products-main">
				{/* Collection sidebar */}
				<aside className="products-sidebar">
					{COLLECTIONS.map(({ value, label, color }) => (
						<button
							key={value}
							className={`products-sidebar__btn${selectedCollection === value ? ' active' : ''}`}
							style={selectedCollection === value ? { borderColor: color, color, backgroundColor: color + '1A' } : {}}
							onClick={() => setSelectedCollection(value)}
						>
							<span
								className="products-sidebar__dot"
								style={{ backgroundColor: selectedCollection === value ? color : undefined }}
							/>
							{label}
						</button>
					))}
				</aside>

				{/* Product grid */}
				<div className="products-grid">
					{isLoading && Array.from({ length: 10 }).map((_, i) => <ProductSkeleton key={i} />)}

					{isError && <div className="products-grid__empty">Failed to load products.</div>}

					{!isLoading && !isError && filtered.slice(0, 10).map((p) => <ProductCard key={p._id} product={p} />)}

					{!isLoading && !isError && filtered.length === 0 && (
						<div className="products-grid__empty">No products found</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Products;
