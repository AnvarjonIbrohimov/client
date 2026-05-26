import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Truck, ShieldCheck, Headphones, Tag } from 'lucide-react';
import '../css/Footer.css';

const QUICK_LINKS = [
	{ label: 'About us', path: '/about' },
	{ label: 'Contact', path: '/contact' },
	{ label: 'Privacy policy', path: '/privacy' },
	{ label: 'Terms', path: '/terms' },
];

const CATEGORIES = [
	{ label: 'Electronics', path: '/products?category=ELECTRONICS' },
	{ label: 'Clothing', path: '/products?category=MEN' },
	{ label: 'Women', path: '/products?category=WOMEN' },
	{ label: 'Kids', path: '/products?category=KIDS' },
	{ label: 'Books', path: '/products?category=BOOKS' },
];

const FEATURES = [
	{ icon: <Truck size={18} strokeWidth={1.8} />, title: 'Free Shipping', sub: 'Orders over $50' },
	{ icon: <ShieldCheck size={18} strokeWidth={1.8} />, title: 'Secure Payment', sub: '100% protected' },
	{ icon: <Headphones size={18} strokeWidth={1.8} />, title: '24/7 Support', sub: 'Always here' },
	{ icon: <Tag size={18} strokeWidth={1.8} />, title: 'Best Prices', sub: 'Guaranteed' },
];

function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="footer">
			{/* ── Feature strip ── */}
			<div className="footer__features">
				<div className="footer__features-inner">
					{FEATURES.map(({ icon, title, sub }) => (
						<div key={title} className="footer__feature">
							<div className="footer__feature-icon">{icon}</div>
							<div>
								<p className="footer__feature-title">{title}</p>
								<p className="footer__feature-sub">{sub}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* ── Main ── */}
			<div className="footer__main">
				{/* Brand */}
				<div className="footer__brand">
					<div className="footer__brand-logo">
						<div className="footer__brand-dot">
							<svg
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#fff"
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
							</svg>
						</div>
						<span className="footer__brand-name">
							Smart<span>Store</span>
						</span>
					</div>
					<p className="footer__brand-desc">
						Your smart shopping destination. Quality products, fast delivery, and the best prices — all in one place.
					</p>
					<div className="footer__socials">
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noopener noreferrer"
							className="footer__social"
							aria-label="Instagram"
						>
							<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
								<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
							</svg>
						</a>
						<a
							href="https://facebook.com"
							target="_blank"
							rel="noopener noreferrer"
							className="footer__social"
							aria-label="Facebook"
						>
							<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
							</svg>
						</a>
						<a
							href="https://t.me"
							target="_blank"
							rel="noopener noreferrer"
							className="footer__social"
							aria-label="Telegram"
						>
							<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
								<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
							</svg>
						</a>
						<a
							href="https://youtube.com"
							target="_blank"
							rel="noopener noreferrer"
							className="footer__social"
							aria-label="YouTube"
						>
							<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
								<path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
							</svg>
						</a>
					</div>
				</div>

				{/* Quick links */}
				<div className="footer__col">
					<h4 className="footer__col-title">Quick links</h4>
					{QUICK_LINKS.map(({ label, path }) => (
						<Link key={path} to={path} className="footer__link">
							{label}
						</Link>
					))}
				</div>

				{/* Categories */}
				<div className="footer__col">
					<h4 className="footer__col-title">Categories</h4>
					{CATEGORIES.map(({ label, path }) => (
						<Link key={path} to={path} className="footer__link">
							{label}
						</Link>
					))}
				</div>

				{/* Contact */}
				<div className="footer__col">
					<h4 className="footer__col-title">Contact</h4>
					<div className="footer__contact-item">
						<div className="footer__contact-icon">
							<MapPin size={13} strokeWidth={2} />
						</div>
						<div>
							<p className="footer__contact-label">Address</p>
							<p className="footer__contact-value">123 Teheran-ro, Gangnam-gu, Seoul</p>
						</div>
					</div>
					<div className="footer__contact-item">
						<div className="footer__contact-icon">
							<Phone size={13} strokeWidth={2} />
						</div>
						<div>
							<p className="footer__contact-label">Phone</p>
							<a href="tel:+82212345678" className="footer__contact-value footer__contact-value--link">
								+82-2-1234-5678
							</a>
						</div>
					</div>
					<div className="footer__contact-item">
						<div className="footer__contact-icon">
							<Mail size={13} strokeWidth={2} />
						</div>
						<div>
							<p className="footer__contact-label">Email</p>
							<a href="mailto:contact@smartstore.kr" className="footer__contact-value footer__contact-value--link">
								contact@smartstore.kr
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* ── Bottom ── */}
			<div className="footer__bottom">
				<p className="footer__copy">© {year} SmartStore. All rights reserved.</p>
				<div className="footer__bottom-links">
					<Link to="/privacy">Privacy</Link>
					<Link to="/terms">Terms</Link>
					<Link to="/help">Help</Link>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
