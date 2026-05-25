import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Header() {
	const location = useLocation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { user, logout } = useAuth();
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
					{navLinks.map((link) => (
						<Link
							key={link.path}
							to={link.path}
							className={location.pathname === link.path ? 'active' : ''}
							onClick={() => setIsMenuOpen(false)}
						>
							{link.label}
						</Link>
					))}
				</nav>
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
