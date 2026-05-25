import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Header() {
	const location = useLocation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const navLinks = [
		{ path: '/', label: 'Home' },
		{ path: '/products', label: 'Products' },
		{ path: '/orders', label: 'Orders' },
		{ path: '/mypage', label: 'My Page' },
		{ path: '/help', label: 'Help' },
	];

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

				{/* MOBILE BUTTON */}
				<button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
					☰
				</button>
			</div>
		</header>
	);
}

export default Header;
