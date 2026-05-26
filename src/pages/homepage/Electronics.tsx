import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, ShoppingCart, ArrowRight, CheckCircle } from 'lucide-react';
import { api, BASE_URL } from '../../libs/config';
import { useOrders } from '../../context/OrderContext';
import { useLike } from '../../hooks/useLike';
import { useAuth } from '../../context/AuthContext';
import '../../css/home/Electronics.css';

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
const fetchElectronics = async (): Promise<Product[]> => {
	const { data } = await api.get('/product/all');
	const all = (Array.isArray(data) ? data : (data.data ?? [])).filter(
		(p: Product) => p.productCategory === 'ELECTRONICS',
	);
	return all.sort(() => Math.random() - 0.5).slice(0, 5);
};

// ─── ElectronicsCard ──────────────────────────────────────────────────────────
function ElectronicsCard({ product }: { product: Product }) {
	const navigate = useNavigate();
	const [views, setViews] = useState(product.productViews ?? 0);
	const { addOrder, isOrdered } = useOrders();
	const { token } = useAuth();
	const ordered = isOrdered(product._id as any);
	const { liked, likeCount, toggleLike } = useLike('PRODUCT', product._id, token);

	const imageUrl = product.productImages?.[0]
		? `${BASE_URL}${product.productImages[0]}`
		: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80';

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
			image: product.productImages?.[0] ? `${BASE_URL}${product.productImages[0]}` : '',
			collection: product.productCollection,
			category: product.productCategory,
			size: product.productSize,
		});
	};

	return (
		<div className="el-card" onClick={() => navigate(`/product/${product._id}`)}>
			<div className="el-card__img-wrap">
				<img src={imageUrl} alt={product.productName} className="el-card__img" />

				<span className="el-card__coll">{product.productCollection}</span>

				<div className="el-card__actions">
					<button className={`el-card__action-btn${liked ? ' liked' : ''}`} onClick={handleLike}>
						<Heart size={14} strokeWidth={2} fill={liked ? 'currentColor' : 'none'} />
						{likeCount > 0 && <span>{likeCount}</span>}
					</button>
					<button className="el-card__action-btn" onClick={handleView}>
						<Eye size={14} strokeWidth={2} />
						<span>{views}</span>
					</button>
				</div>
			</div>

			<div className="el-card__content">
				<p className="el-card__name">{product.productName}</p>
				{product.productDesc && <p className="el-card__desc">{product.productDesc}</p>}
				<div className="el-card__bottom">
					<span className="el-card__price">${product.productPrice}</span>
					<button className={`el-card__cart${ordered ? ' ordered' : ''}`} onClick={handleCart}>
						{ordered ? <CheckCircle size={13} strokeWidth={2.5} /> : <ShoppingCart size={13} strokeWidth={2.5} />}
					</button>
				</div>
			</div>
		</div>
	);
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function ElectronicsCardSkeleton() {
	return (
		<div className="el-card el-card--skeleton">
			<div className="el-card__img-wrap el-skeleton__img" />
			<div className="el-card__content">
				<div className="el-skeleton__line el-skeleton__line--long" />
				<div className="el-skeleton__line el-skeleton__line--short" />
				<div className="el-skeleton__line el-skeleton__line--med" />
			</div>
		</div>
	);
}

// ─── Electronics ──────────────────────────────────────────────────────────────
function Electronics() {
	const navigate = useNavigate();

	const {
		data: products,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['electronics'],
		queryFn: fetchElectronics,
	});

	return (
		<section className="electronics-section">
			<div className="electronics-section__header">
				<div>
					<h2 className="electronics-section__title">Electronics</h2>
					<p className="electronics-section__sub">Gadgets · Devices · Tech</p>
				</div>
				<button className="electronics-section__more" onClick={() => navigate('/products')}>
					View all
					<ArrowRight size={14} strokeWidth={2.5} />
				</button>
			</div>

			<div className="electronics-grid">
				{isLoading && Array.from({ length: 5 }).map((_, i) => <ElectronicsCardSkeleton key={i} />)}
				{isError && <div className="electronics-error">Failed to load products. Please try again.</div>}
				{!isLoading && !isError && products?.map((p) => <ElectronicsCard key={p._id} product={p} />)}
				{!isLoading && !isError && products?.length === 0 && (
					<div className="electronics-empty">No electronics found.</div>
				)}
			</div>
		</section>
	);
}

export default Electronics;
