import '../../css/products/Brands.css';

// ─── Types ────────────────────────────────────────────────────────────────────
interface SocialLinks {
	instagram?: string;
	facebook?: string;
	telegram?: string;
}

interface Brand {
	_id: string;
	brandName: string;
	brandLogo: string;
	brandAddress: string;
	brandPhone: string;
	brandEmail: string;
	workingHours: string;
	socialLinks: SocialLinks;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const BRANDS: Brand[] = [
	{
		_id: '6a0f15a8aac2fbf229d779dd',
		brandName: 'Nike',
		brandLogo: '/images/nike.png',
		brandAddress: 'Seoul, Gangnam-gu, Teheran-ro 123',
		brandPhone: '+82-2-1234-5678',
		brandEmail: 'contact@nike.co.kr',
		workingHours: 'Mon–Fri: 10:00–20:00\nSat–Sun: 11:00–19:00',
		socialLinks: {
			instagram: 'https://www.instagram.com/nike',
			facebook: 'https://www.facebook.com/nike',
			telegram: 'https://t.me/nike',
		},
	},
	{
		_id: '6a0f15a8aac2fbf229d779de',
		brandName: 'Adidas',
		brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/2560px-Adidas_Logo.svg.png',
		brandAddress: 'Seoul, Mapo-gu, Hongik-ro 45',
		brandPhone: '+82-2-2345-6789',
		brandEmail: 'contact@adidas.co.kr',
		workingHours: 'Mon–Fri: 09:00–19:00\nSat: 10:00–18:00',
		socialLinks: {
			instagram: 'https://www.instagram.com/adidas',
			facebook: 'https://www.facebook.com/adidas',
			telegram: 'https://t.me/adidas',
		},
	},
	{
		_id: '6a0f15a8aac2fbf229d779df',
		brandName: 'Puma',
		brandLogo:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/PUMA_brand_logo.svg/2560px-PUMA_brand_logo.svg.png',
		brandAddress: 'Busan, Haeundae-gu, Marine-ro 88',
		brandPhone: '+82-51-3456-7890',
		brandEmail: 'contact@puma.co.kr',
		workingHours: 'Mon–Sat: 10:00–20:00\nSun: 12:00–18:00',
		socialLinks: {
			instagram: 'https://www.instagram.com/puma',
			facebook: 'https://www.facebook.com/puma',
		},
	},
	{
		_id: '6a0f15a8aac2fbf229d779e0',
		brandName: 'New Balance',
		brandLogo:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/New_Balance_logo.svg/2560px-New_Balance_logo.svg.png',
		brandAddress: 'Incheon, Yeonsu-gu, Art Center-ro 200',
		brandPhone: '+82-32-4567-8901',
		brandEmail: 'contact@nb.co.kr',
		workingHours: 'Mon–Fri: 10:00–19:00\nSat–Sun: 11:00–18:00',
		socialLinks: {
			instagram: 'https://www.instagram.com/newbalance',
			telegram: 'https://t.me/newbalance',
		},
	},
	{
		_id: '6a0f15a8aac2fbf229d779e1',
		brandName: 'Converse',
		brandLogo:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Converse_logo.svg/2560px-Converse_logo.svg.png',
		brandAddress: 'Daegu, Jung-gu, Dongseong-ro 55',
		brandPhone: '+82-53-5678-9012',
		brandEmail: 'contact@converse.co.kr',
		workingHours: 'Mon–Fri: 11:00–20:00\nSat–Sun: 10:00–21:00',
		socialLinks: {
			instagram: 'https://www.instagram.com/converse',
			facebook: 'https://www.facebook.com/converse',
			telegram: 'https://t.me/converse',
		},
	},
	{
		_id: '6a0f15a8aac2fbf229d779e2',
		brandName: 'Vans',
		brandLogo:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Vans-brand-logo.svg/2560px-Vans-brand-logo.svg.png',
		brandAddress: 'Seoul, Yongsan-gu, Itaewon-ro 300',
		brandPhone: '+82-2-6789-0123',
		brandEmail: 'contact@vans.co.kr',
		workingHours: 'Mon–Sun: 11:00–22:00',
		socialLinks: {
			instagram: 'https://www.instagram.com/vans',
			facebook: 'https://www.facebook.com/vans',
			telegram: 'https://t.me/vans',
		},
	},
	{
		_id: '6a0f15a8aac2fbf229d779e3',
		brandName: 'Under Armour',
		brandLogo:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Under_armour_logo.svg/2560px-Under_armour_logo.svg.png',
		brandAddress: 'Seoul, Songpa-gu, Olympic-ro 424',
		brandPhone: '+82-2-7890-1234',
		brandEmail: 'contact@ua.co.kr',
		workingHours: 'Mon–Fri: 09:00–18:00\nSat: 10:00–17:00',
		socialLinks: {
			instagram: 'https://www.instagram.com/underarmour',
			facebook: 'https://www.facebook.com/underarmour',
		},
	},
	{
		_id: '6a0f15a8aac2fbf229d779e4',
		brandName: 'Reebok',
		brandLogo:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Reebok_2019_logo.svg/2560px-Reebok_2019_logo.svg.png',
		brandAddress: 'Gwangju, Seo-gu, Chosun-ro 77',
		brandPhone: '+82-62-8901-2345',
		brandEmail: 'contact@reebok.co.kr',
		workingHours: 'Mon–Fri: 10:00–19:00\nSat–Sun: 11:00–17:00',
		socialLinks: {
			instagram: 'https://www.instagram.com/reebok',
			telegram: 'https://t.me/reebok',
		},
	},
	{
		_id: '6a0f15a8aac2fbf229d779e5',
		brandName: 'Champion',
		brandLogo:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Champion_logo_2020.svg/2560px-Champion_logo_2020.svg.png',
		brandAddress: 'Seoul, Seodaemun-gu, Yonsei-ro 50',
		brandPhone: '+82-2-9012-3456',
		brandEmail: 'contact@champion.co.kr',
		workingHours: 'Mon–Sat: 10:00–20:00\nSun: 12:00–18:00',
		socialLinks: {
			instagram: 'https://www.instagram.com/champion',
			facebook: 'https://www.facebook.com/champion',
			telegram: 'https://t.me/champion',
		},
	},
	{
		_id: '6a0f15a8aac2fbf229d779e6',
		brandName: 'Fila',
		brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Fila_logo.svg/2560px-Fila_logo.svg.png',
		brandAddress: 'Suwon, Paldal-gu, Paldal-ro 2',
		brandPhone: '+82-31-0123-4567',
		brandEmail: 'contact@fila.co.kr',
		workingHours: 'Mon–Fri: 10:00–19:00\nSat–Sun: 10:00–20:00',
		socialLinks: {
			instagram: 'https://www.instagram.com/fila',
			facebook: 'https://www.facebook.com/fila',
		},
	},
];

// ─── BrandCard ────────────────────────────────────────────────────────────────
function BrandCard({ brand }: { brand: Brand }) {
	return (
		<div className="brand-card">
			{/* ── Front ── */}
			<div className="brand-card__front">
				<div className="brand-card__logo-wrap">
					<img src={brand.brandLogo} alt={brand.brandName} className="brand-card__logo" />
				</div>
				<p className="brand-card__name">{brand.brandName}</p>
			</div>

			{/* ── Back ── */}
			<div className="brand-card__back">
				<p className="brand-card__back-name">{brand.brandName}</p>

				<div className="brand-card__info">
					<div className="brand-card__info-row">
						<span className="brand-card__info-icon">🕐</span>
						<span className="brand-card__info-text">
							{brand.workingHours.split('\n').map((line, i) => (
								<span key={i}>
									{line}
									{i === 0 && <br />}
								</span>
							))}
						</span>
					</div>

					<div className="brand-card__info-row">
						<span className="brand-card__info-icon">📞</span>
						<span className="brand-card__info-text">{brand.brandPhone}</span>
					</div>

					<div className="brand-card__info-row">
						<span className="brand-card__info-icon">📍</span>
						<span className="brand-card__info-text">{brand.brandAddress}</span>
					</div>
				</div>

				<div className="brand-card__socials">
					{brand.socialLinks.instagram && (
						<a
							href={brand.socialLinks.instagram}
							target="_blank"
							rel="noopener noreferrer"
							className="brand-card__social-btn brand-card__social-btn--ig"
							aria-label="Instagram"
						>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
							</svg>
						</a>
					)}
					{brand.socialLinks.facebook && (
						<a
							href={brand.socialLinks.facebook}
							target="_blank"
							rel="noopener noreferrer"
							className="brand-card__social-btn brand-card__social-btn--fb"
							aria-label="Facebook"
						>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
							</svg>
						</a>
					)}
					{brand.socialLinks.telegram && (
						<a
							href={brand.socialLinks.telegram}
							target="_blank"
							rel="noopener noreferrer"
							className="brand-card__social-btn brand-card__social-btn--tg"
							aria-label="Telegram"
						>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
								<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
							</svg>
						</a>
					)}
				</div>
			</div>
		</div>
	);
}

// ─── Brands ───────────────────────────────────────────────────────────────────
function Brands() {
	return (
		<div className="brands-section">
			<div className="brands-section__header">
				<h2 className="brands-section__title">Our Brands</h2>
				<span className="brands-section__count">{BRANDS.length} brands</span>
			</div>

			<div className="brands-grid">
				{BRANDS.map((brand) => (
					<BrandCard key={brand._id} brand={brand} />
				))}
			</div>
		</div>
	);
}

export default Brands;
