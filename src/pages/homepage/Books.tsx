import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, ShoppingCart, ArrowRight, CheckCircle } from 'lucide-react';
import { api, getImageUrl } from '../../libs/config';
import { useOrders } from '../../context/OrderContext';
import { useLike } from '../../hooks/useLike';
import { useAuth } from '../../context/AuthContext';
import '../../css/home/Books.css';

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
const fetchBooks = async (): Promise<Product[]> => {
	const { data } = await api.get('/product/all');
	const all = (Array.isArray(data) ? data : (data.data ?? [])).filter((p: Product) => p.productCategory === 'BOOKS');
	return all.sort(() => Math.random() - 0.5).slice(0, 5);
};

// ─── BookCard ─────────────────────────────────────────────────────────────────
function BookCard({ product }: { product: Product }) {
	const navigate = useNavigate();
	const [views, setViews] = useState(product.productViews ?? 0);
	const { addOrder, isOrdered } = useOrders();
	const { token } = useAuth();
	const ordered = isOrdered(product._id);
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
		<div className="bk-card" onClick={() => navigate(`/product/${product._id}`)}>
			<div className="bk-card__img-wrap">
				<img src={imageUrl} alt={product.productName} className="bk-card__img" />

				<span className="bk-card__coll">{product.productCollection}</span>

				<div className="bk-card__actions">
					<button className={`bk-card__action-btn${liked ? ' liked' : ''}`} onClick={handleLike}>
						<Heart size={14} strokeWidth={2} fill={liked ? 'currentColor' : 'none'} />
						{likeCount > 0 && <span>{likeCount}</span>}
					</button>
					<button className="bk-card__action-btn" onClick={handleView}>
						<Eye size={14} strokeWidth={2} />
						<span>{views}</span>
					</button>
				</div>
			</div>

			<div className="bk-card__content">
				<p className="bk-card__name">{product.productName}</p>
				{product.productDesc && <p className="bk-card__desc">{product.productDesc}</p>}
				<div className="bk-card__bottom">
					<span className="bk-card__price">${product.productPrice}</span>
					<button className={`bk-card__cart${ordered ? ' ordered' : ''}`} onClick={handleCart}>
						{ordered ? <CheckCircle size={13} strokeWidth={2.5} /> : <ShoppingCart size={13} strokeWidth={2.5} />}
					</button>
				</div>
			</div>
		</div>
	);
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function BookCardSkeleton() {
	return (
		<div className="bk-card bk-card--skeleton">
			<div className="bk-card__img-wrap bk-skeleton__img" />
			<div className="bk-card__content">
				<div className="bk-skeleton__line bk-skeleton__line--long" />
				<div className="bk-skeleton__line bk-skeleton__line--short" />
				<div className="bk-skeleton__line bk-skeleton__line--med" />
			</div>
		</div>
	);
}

// ─── Books ────────────────────────────────────────────────────────────────────
function Books() {
	const navigate = useNavigate();

	const {
		data: products,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['books'],
		queryFn: fetchBooks,
	});

	return (
		<section className="books-section">
			<div className="books-section__header">
				<div>
					<h2 className="books-section__title">Books Collection</h2>
					<p className="books-section__sub">Bestsellers · New arrivals</p>
				</div>
				<button className="books-section__more" onClick={() => navigate('/products')}>
					View all
					<ArrowRight size={14} strokeWidth={2.5} />
				</button>
			</div>

			<div className="books-grid">
				{isLoading && Array.from({ length: 5 }).map((_, i) => <BookCardSkeleton key={i} />)}
				{isError && <div className="books-error">Failed to load books. Please try again.</div>}
				{!isLoading && !isError && products?.map((p) => <BookCard key={p._id} product={p} />)}
				{!isLoading && !isError && products?.length === 0 && <div className="books-empty">No books found.</div>}
			</div>
		</section>
	);
}

export default Books;
