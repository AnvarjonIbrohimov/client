import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import '../css/Header.css';
import { BASE_URL } from '../libs/config';
import { Heart } from 'lucide-react';

function Header() {
	const location = useLocation();
	const [menuOpen, setMenuOpen] = useState(false);
	const { user, logout } = useAuth();
	const { orders } = useOrders();

	const pausedCount = orders.filter((o) => o.status === 'paused').length;
	const processCount = orders.filter((o) => o.status === 'process').length;
	const finishedCount = orders.filter((o) => o.status === 'finished').length;
	const badgeCount = pausedCount || processCount || finishedCount;
	const badgeStatus = pausedCount ? 'paused' : processCount ? 'process' : finishedCount ? 'finished' : null;

	const navLinks = [
		{ path: '/', label: 'Home' },
		{ path: '/products', label: 'Products' },
		{ path: '/help', label: 'Help' },
	];
	// Header.tsx da avatar qismini o'zgartiring:
	const avatarUrl = user?.memberImage
		? user.memberImage.startsWith('http')
			? user.memberImage
			: `${BASE_URL}${user.memberImage}`
		: null;
	const handleLogout = () => {
		const confirmed = window.confirm('Are you sure you want to logout?');
		if (confirmed) {
			localStorage.removeItem('smartstore_orders'); // orders tozalash
			logout();
		}
	};

	if (user) {
		navLinks.push({ path: '/orders', label: 'Orders' }, { path: '/mypage', label: 'My Page' });
	}

	const initials = user?.memberNick?.slice(0, 2).toUpperCase() ?? '';

	return (
		<header className="header">
			<div className="header__inner">
				{/* ── Logo ── */}
				<Link to="/" className="header__logo">
					<div className="header__logo-dot">
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
					<div>
						<div className="header__logo-name">
							Smart<span>Store</span>
						</div>
						<div className="header__logo-sub">Online shop</div>
					</div>
				</Link>

				{/* ── Nav (desktop) ── */}
				<nav className={`header__nav${menuOpen ? ' open' : ''}`}>
					{navLinks.map(({ path, label }) => {
						const isActive = location.pathname === path;
						const isOrders = path === '/orders';

						return (
							<Link
								key={path}
								to={path}
								className={`header__nav-link${isActive ? ' active' : ''}`}
								onClick={() => setMenuOpen(false)}
							>
								{label}
								{isOrders && user && badgeStatus && (
									<span className={`header__badge header__badge--${badgeStatus}`}>
										{badgeStatus === 'finished' ? (
											<svg
												width="9"
												height="9"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="3"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<polyline points="20 6 9 17 4 12" />
											</svg>
										) : (
											badgeCount
										)}
									</span>
								)}
							</Link>
						);
					})}
				</nav>

				{/* ── Right ── */}
				<div className="header__right">
					{user ? (
						<>
							{user && (
								<Link to="/liked-products" className="header__liked">
									<Heart size={16} strokeWidth={2} />
								</Link>
							)}
							<div className="header__avatar">
								{avatarUrl ? (
									<img
										src={avatarUrl}
										alt={initials}
										style={{
											width: '100%',
											height: '100%',
											objectFit: 'cover',
											borderRadius: '50%',
										}}
									/>
								) : (
									initials
								)}
							</div>
							<button className="header__logout" onClick={handleLogout}>
								Logout
							</button>
						</>
					) : (
						<>
							<Link to="/login" className="header__login">
								Login
							</Link>
							<Link to="/signup" className="header__signup">
								Sign up
							</Link>
						</>
					)}

					{/* Mobile burger */}
					<button className="header__burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">
						{menuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
					</button>
				</div>
			</div>
		</header>
	);
}

export default Header;
