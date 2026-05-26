import { useState } from 'react';
import '../../css/products/product.css';
import { useOrders } from '../../context/OrderContext';
import { BADGE_COLORS, CATEGORIES, COLLECTIONS, SIZE_CATEGORIES, type Product } from '../../types/product';
import { ProductCategory, ProductCollection, ProductSize } from '../../enums/prodcut.enum';
import { useNavigate } from 'react-router-dom';

// ─── Mock Data ───────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
	{
		id: 1,
		name: 'Classic Hoodie',
		price: 89000,
		image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80',
		collection: ProductCollection.POPULAR,
		category: ProductCategory.MEN,
		sizes: [ProductSize.S, ProductSize.M, ProductSize.L],
	},
	{
		id: 2,
		name: 'Slim Fit Jeans',
		price: 120000,
		image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80',
		collection: ProductCollection.NEW,
		category: ProductCategory.MEN,
		sizes: [ProductSize.M, ProductSize.L, ProductSize.XL],
	},
	{
		id: 3,
		name: 'Oxford Shirt',
		price: 72000,
		image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80',
		collection: ProductCollection.REGULAR,
		category: ProductCategory.MEN,
		sizes: [ProductSize.S, ProductSize.M, ProductSize.L, ProductSize.XL],
	},
	{
		id: 4,
		name: 'Floral Dress',
		price: 95000,
		image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80',
		collection: ProductCollection.NEW,
		category: ProductCategory.WOMEN,
		sizes: [ProductSize.XS, ProductSize.S, ProductSize.M],
	},
	{
		id: 5,
		name: 'Leather Jacket',
		price: 250000,
		image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80',
		collection: ProductCollection.POPULAR,
		category: ProductCategory.WOMEN,
		sizes: [ProductSize.S, ProductSize.M],
	},
	{
		id: 6,
		name: 'Summer Blouse',
		price: 58000,
		image: 'https://images.unsplash.com/photo-1594938298603-c8148c4b4c5b?w=400&q=80',
		collection: ProductCollection.SALE,
		category: ProductCategory.WOMEN,
		sizes: [ProductSize.XS, ProductSize.S, ProductSize.M, ProductSize.L],
	},
	{
		id: 7,
		name: 'Kids Sneakers',
		price: 65000,
		image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
		collection: ProductCollection.SALE,
		category: ProductCategory.KIDS,
		sizes: [ProductSize.XS, ProductSize.S],
	},
	{
		id: 8,
		name: 'Mini Backpack',
		price: 78000,
		image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
		collection: ProductCollection.POPULAR,
		category: ProductCategory.KIDS,
		sizes: [ProductSize.M],
	},
	{
		id: 9,
		name: 'Kids Hoodie',
		price: 49000,
		image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&q=80',
		collection: ProductCollection.NEW,
		category: ProductCategory.KIDS,
		sizes: [ProductSize.XS, ProductSize.S],
	},
	{
		id: 10,
		name: 'Wireless Earbuds',
		price: 199000,
		image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80',
		collection: ProductCollection.NEW,
		category: ProductCategory.ELECTRONICS,
	},
	{
		id: 11,
		name: 'Smart Watch',
		price: 450000,
		image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',
		collection: ProductCollection.POPULAR,
		category: ProductCategory.ELECTRONICS,
	},
	{
		id: 12,
		name: 'Mechanical KB',
		price: 320000,
		image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&q=80',
		collection: ProductCollection.NEW,
		category: ProductCategory.ELECTRONICS,
	},
	{
		id: 13,
		name: 'Atomic Habits',
		price: 45000,
		image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80',
		collection: ProductCollection.POPULAR,
		category: ProductCategory.BOOKS,
	},
	{
		id: 14,
		name: 'Clean Code',
		price: 55000,
		image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&q=80',
		collection: ProductCollection.REGULAR,
		category: ProductCategory.BOOKS,
	},
	{
		id: 15,
		name: 'Design Thinking',
		price: 38000,
		image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&q=80',
		collection: ProductCollection.SALE,
		category: ProductCategory.BOOKS,
	},
];

// ─── ProductCard ─────────────────────────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
	const [liked, setLiked] = useState(false);
	const [viewed, setViewed] = useState(false);
	const { addOrder, isOrdered } = useOrders();
	const ordered = isOrdered(product.id);
	const navigate = useNavigate();

	const handleCart = () => {
		if (ordered) return;
		addOrder({
			productId: product.id,
			name: product.name,
			price: product.price,
			image: product.image,
			collection: product.collection,
			category: product.category,
			size: product.sizes?.[0],
		});
	};

	return (
		<div className="p-card" onClick={() => navigate(`/products/${product.id}`)}>
			<div className="p-card__image-box">
				<img src={product.image} alt={product.name} />

				<span className="p-card__badge" style={{ backgroundColor: BADGE_COLORS[product.collection] }}>
					{product.collection}
				</span>

				<div className="p-card__icons">
					<button
						className={`p-card__icon-btn${liked ? ' active-like' : ''}`}
						onClick={() => setLiked((v) => !v)}
						aria-label="Like"
					>
						♥
					</button>
					<button
						className={`p-card__icon-btn${viewed ? ' active-view' : ''}`}
						onClick={() => setViewed((v) => !v)}
						aria-label="View"
					>
						👁
					</button>
				</div>
			</div>

			<div className="p-card__content">
				<h3 className="p-card__name">{product.name}</h3>
				<div className="p-card__bottom">
					<span className="p-card__price">{product.price.toLocaleString()} so'm</span>
					<button
						className={`p-card__cart-btn${ordered ? ' p-card__cart-btn--ordered' : ''}`}
						onClick={handleCart}
						disabled={ordered}
					>
						{ordered ? '✓ Added' : '+ Cart'}
					</button>
				</div>
			</div>
		</div>
	);
}

// ─── Products ────────────────────────────────────────────────────────────────
function Products() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(ProductCategory.MEN);
	const [selectedCollection, setSelectedCollection] = useState<ProductCollection>(ProductCollection.POPULAR);
	const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);

	const showSizes = SIZE_CATEGORIES.has(selectedCategory);

	const handleCategoryChange = (cat: ProductCategory) => {
		setSelectedCategory(cat);
		setSelectedSize(null);
	};

	const handleSizeClick = (size: ProductSize) => {
		setSelectedSize((prev) => (prev === size ? null : size));
	};

	const filtered = PRODUCTS.filter((p) => {
		if (p.category !== selectedCategory) return false;
		if (p.collection !== selectedCollection) return false;
		if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
		if (selectedSize && !(p.sizes ?? []).includes(selectedSize)) return false;
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
						type="text"
						placeholder="Type here"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="products-header__input"
					/>
					<button className="products-header__search-btn">SEARCH</button>
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

			{/* ── Size filter (conditional) ── */}
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

			{/* ── Main: sidebar + grid ── */}
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
					{filtered.slice(0, 10).map((p) => (
						<ProductCard key={p.id} product={p} />
					))}

					{filtered.length === 0 && <div className="products-grid__empty">No products found</div>}
				</div>
			</div>
		</div>
	);
}

export default Products;
