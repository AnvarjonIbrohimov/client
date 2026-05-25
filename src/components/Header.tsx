import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/Ordercontext';
import { CheckCheck } from 'lucide-react';

function Header() {
	const location = useLocation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { user, logout } = useAuth();
	const { orders } = useOrders();

	// badge counts
	const pausedCount = orders.filter((o) => o.status === 'paused').length;
	const processCount = orders.filter((o) => o.status === 'process').length;
	const finishedCount = orders.filter((o) => o.status === 'finished').length;

	// dominant status: paused > process > finished
	const badgeCount = pausedCount || processCount || finishedCount;
	const badgeStatus = pausedCount ? 'paused' : processCount ? 'process' : finishedCount ? 'finished' : null;

	const navLinks = [
		{ path: '/', label: 'Home' },
		{ path: '/products', label: 'Products' },
		{ path: '/help', label: 'Help' },
	];

	if (user) {
		navLinks.push({ path: '/orders', label: 'Orders' }, { path: '/mypage', label: 'My Page' });
	}

	return (
		<header className="header">
			<div className="container header-inner">
				{/* LOGO */}
				<Link to="/" className="logo">
					Smart Store
				</Link>

				{/* NAV */}
				<nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
					{navLinks.map((link) => {
						const isOrders = link.path === '/orders';
						const isActive = location.pathname === link.path;

						return (
							<Link
								key={link.path}
								to={link.path}
								className={isActive ? 'active' : ''}
								onClick={() => setIsMenuOpen(false)}
								style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 6 }}
							>
								{link.label}

								{/* Orders badge — only show when logged in and has orders */}
								{isOrders && user && badgeStatus && (
									<span className={`orders-nav-badge orders-nav-badge--${badgeStatus}`}>
										{badgeStatus === 'finished' ? <CheckCheck size={10} strokeWidth={3} /> : badgeCount}
									</span>
								)}
							</Link>
						);
					})}
				</nav>

				{/* AUTH */}
				<div className="auth-buttons">
					{user ? (
						<button onClick={logout} className="logout-btn">
							Logout
						</button>
					) : (
						<>
							<Link to="/login">Login</Link>
							<Link to="/signup">Signup</Link>
						</>
					)}
				</div>

				{/* MOBILE BUTTON */}
				<button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
					☰
				</button>
			</div>
		</header>
	);
}

export default Header;
