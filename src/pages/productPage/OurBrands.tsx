import { useQuery } from '@tanstack/react-query';
import { api, BASE_URL } from '../../libs/config';
import { useAuth } from '../../context/AuthContext';
import { useLike } from '../../hooks/useLike';
import '../../css/products/Brands.css';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Brand {
	_id: string;
	brandName: string;
	brandLogo?: string;
	brandAddress?: string;
	brandPhone?: string;
	brandEmail?: string;
	workingHours?: string;
	socialLinks?: {
		instagram?: string;
		facebook?: string;
		telegram?: string;
	};
}

// ─── API ──────────────────────────────────────────────────────────────────────
const fetchBrands = async (): Promise<Brand[]> => {
	const { data } = await api.get('/brand/all');
	return Array.isArray(data) ? data : (data.data ?? []);
};

// ─── BrandCard ────────────────────────────────────────────────────────────────
function BrandCard({ brand }: { brand: Brand }) {
	const { token } = useAuth();
	const { liked, likeCount, toggleLike } = useLike('BRAND', brand._id, token);

	const logoUrl = brand.brandLogo
		? brand.brandLogo.startsWith('http')
			? brand.brandLogo
			: `${BASE_URL}${brand.brandLogo}`
		: null;

	const hours = brand.workingHours?.split('\n') ?? [];

	return (
		<div className="brand-card">
			{/* ── Front ── */}
			<div className="brand-card__front">
				<div className="brand-card__logo-wrap">
					{logoUrl ? (
						<img src={logoUrl} alt={brand.brandName} className="brand-card__logo" />
					) : (
						<div className="brand-card__logo-placeholder">{brand.brandName.slice(0, 2).toUpperCase()}</div>
					)}
				</div>
				<p className="brand-card__name">{brand.brandName}</p>
			</div>

			{/* ── Back ── */}
			<div className="brand-card__back">
				<div className="brand-card__back-top">
					<p className="brand-card__back-name">{brand.brandName}</p>
					<button
						className={`brand-card__like${liked ? ' liked' : ''}`}
						onClick={(e) => {
							e.stopPropagation();
							toggleLike();
						}}
						aria-label="Like"
					>
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill={liked ? 'currentColor' : 'none'}
							stroke="currentColor"
							strokeWidth="2.5"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
						</svg>
						{likeCount > 0 && <span>{likeCount}</span>}
					</button>
				</div>

				<div className="brand-card__info">
					{hours.length > 0 && (
						<div className="brand-card__info-row">
							<svg
								className="brand-card__info-icon"
								width="10"
								height="10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<circle cx="12" cy="12" r="10" />
								<polyline points="12 6 12 12 16 14" />
							</svg>
							<span className="brand-card__info-text">
								{hours.map((line, i) => (
									<span key={i}>
										{line}
										{i < hours.length - 1 && <br />}
									</span>
								))}
							</span>
						</div>
					)}

					{brand.brandPhone && (
						<div className="brand-card__info-row">
							<svg
								className="brand-card__info-icon"
								width="10"
								height="10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
							</svg>
							<span className="brand-card__info-text">{brand.brandPhone}</span>
						</div>
					)}

					{brand.brandAddress && (
						<div className="brand-card__info-row">
							<svg
								className="brand-card__info-icon"
								width="10"
								height="10"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
								<circle cx="12" cy="10" r="3" />
							</svg>
							<span className="brand-card__info-text">{brand.brandAddress}</span>
						</div>
					)}
				</div>

				<div className="brand-card__socials">
					{brand.socialLinks?.instagram && (
						<a
							href={brand.socialLinks.instagram}
							target="_blank"
							rel="noopener noreferrer"
							className="brand-card__social-btn"
							aria-label="Instagram"
						>
							<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
							</svg>
						</a>
					)}
					{brand.socialLinks?.facebook && (
						<a
							href={brand.socialLinks.facebook}
							target="_blank"
							rel="noopener noreferrer"
							className="brand-card__social-btn"
							aria-label="Facebook"
						>
							<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
							</svg>
						</a>
					)}
					{brand.socialLinks?.telegram && (
						<a
							href={brand.socialLinks.telegram}
							target="_blank"
							rel="noopener noreferrer"
							className="brand-card__social-btn"
							aria-label="Telegram"
						>
							<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
								<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
							</svg>
						</a>
					)}
				</div>
			</div>
		</div>
	);
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function BrandSkeleton() {
	return (
		<div className="brand-card brand-card--skeleton">
			<div className="brand-skeleton__body" />
		</div>
	);
}

// ─── Brands ───────────────────────────────────────────────────────────────────
function Brands() {
	const {
		data: brands,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['brands'],
		queryFn: fetchBrands,
	});

	return (
		<div className="brands-section">
			<div className="brands-section__header">
				<h2 className="brands-section__title">Our Brands</h2>
				{brands && <span className="brands-section__count">{brands.length} brands</span>}
			</div>

			<div className="brands-grid">
				{isLoading && Array.from({ length: 10 }).map((_, i) => <BrandSkeleton key={i} />)}
				{isError && <p style={{ color: '#ccc', fontSize: 13 }}>Failed to load brands.</p>}
				{!isLoading && !isError && brands?.map((brand) => <BrandCard key={brand._id} brand={brand} />)}
			</div>
		</div>
	);
}

export default Brands;
