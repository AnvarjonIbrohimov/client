import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ShoppingCart, Search, Menu, X, User, Heart, Sun, Moon } from 'lucide-react';

function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [cartCount, setCartCount] = useState(3); // API dan keladi
	const location = useLocation();

	// Dark mode toggle
	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [isDarkMode]);

	const navLinks = [
		{ path: '/', label: 'Home' },
		{ path: '/products', label: 'Products' },
		{ path: '/product/:id', label: 'Product Detail' },
		{ path: '/users', label: 'Users' },
		{ path: '/orders', label: 'Orders' },
		{ path: '/help', label: 'Help' },
		{ path: '/mypage', label: 'My Page' },
	];

	return (
		<header className="sticky top-0 z-50 bg-white shadow-sm dark:bg-gray-900 dark:border-b dark:border-gray-700">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between gap-4">
					{/* Logo */}
					<Link to="/" className="flex items-center gap-2 shrink-0">
						<div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"></div>
						<h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent sm:text-2xl">
							Smart Store
						</h1>
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden items-center gap-6 md:flex">
						{navLinks.map((link) => (
							<Link
								key={link.path}
								to={link.path}
								className={`text-sm font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-400 ${
									location.pathname === link.path
										? 'text-purple-600 dark:text-purple-400'
										: 'text-gray-700 dark:text-gray-300'
								}`}
							>
								{link.label}
							</Link>
						))}
					</nav>

					{/* Right side icons */}
					<div className="flex items-center gap-2 sm:gap-4">
						{/* Search Button */}
						<button className="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
							<Search className="h-5 w-5" />
						</button>

						{/* Dark Mode Toggle */}
						<button
							onClick={() => setIsDarkMode(!isDarkMode)}
							className="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
						>
							{isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
						</button>

						{/* Wishlist */}
						<button className="rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
							<Heart className="h-5 w-5" />
						</button>

						{/* Cart */}
						<Link
							to="/cart"
							className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
						>
							<ShoppingCart className="h-5 w-5" />
							{cartCount > 0 && (
								<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-xs font-bold text-white">
									{cartCount}
								</span>
							)}
						</Link>

						{/* User Menu */}
						<div className="relative">
							<button className="rounded-full bg-gradient-to-r from-purple-600 to-blue-600 p-1.5 text-white hover:opacity-90">
								<User className="h-5 w-5" />
							</button>
						</div>

						{/* Mobile Menu Button */}
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="rounded-md p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 md:hidden"
						>
							{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<div className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 md:hidden">
					<div className="space-y-1 px-4 pb-3 pt-2">
						{navLinks.map((link) => (
							<Link
								key={link.path}
								to={link.path}
								onClick={() => setIsMenuOpen(false)}
								className={`block rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
									location.pathname === link.path
										? 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400'
										: 'text-gray-700 dark:text-gray-300'
								}`}
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			)}
		</header>
	);
}

export default Header;
