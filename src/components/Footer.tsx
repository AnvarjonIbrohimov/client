import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShoppingBag, Shield, Truck, Headphones } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

function Footer() {
	const currentYear = new Date().getFullYear();

	const quickLinks = [
		{ name: 'About Us', path: '/about' },
		{ name: 'Contact', path: '/contact' },
		{ name: 'Privacy Policy', path: '/privacy' },
		{ name: 'Terms of Service', path: '/terms' },
		{ name: 'Shipping Info', path: '/shipping' },
		{ name: 'Returns', path: '/returns' },
	];

	const categories = [
		{ name: 'Electronics', path: '/products?category=electronics' },
		{ name: 'Clothing', path: '/products?category=clothing' },
		{ name: 'Books', path: '/products?category=books' },
		{ name: 'Home & Garden', path: '/products?category=home' },
		{ name: 'Sports', path: '/products?category=sports' },
		{ name: 'Toys', path: '/products?category=toys' },
	];

	return (
		<footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
			{/* Features Section */}
			<div className="border-b border-gray-200 dark:border-gray-800">
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<div className="grid grid-cols-2 gap-6 md:grid-cols-4">
						<div className="flex items-center gap-3">
							<Truck className="h-8 w-8 text-purple-600" />
							<div>
								<h3 className="font-semibold text-gray-900 dark:text-white">Free Shipping</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400">On orders over $50</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<Shield className="h-8 w-8 text-purple-600" />
							<div>
								<h3 className="font-semibold text-gray-900 dark:text-white">Secure Payment</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400">100% secure transactions</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<Headphones className="h-8 w-8 text-purple-600" />
							<div>
								<h3 className="font-semibold text-gray-900 dark:text-white">24/7 Support</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400">Dedicated support team</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<ShoppingBag className="h-8 w-8 text-purple-600" />
							<div>
								<h3 className="font-semibold text-gray-900 dark:text-white">Best Prices</h3>
								<p className="text-sm text-gray-600 dark:text-gray-400">Price match guarantee</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Main Footer */}
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					{/* Brand Section */}
					<div>
						<Link to="/" className="flex items-center gap-2 mb-4">
							<div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"></div>
							<h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
								Smart Store
							</h2>
						</Link>
						<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
							Your one-stop shop for everything smart. Quality products, competitive prices, and exceptional service.
						</p>
						<div className="mt-4 flex space-x-4">
							<a href="#" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400">
								<FaFacebook className="h-5 w-5" />
							</a>
							<a href="#" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400">
								<FaTwitter className="h-5 w-5" />
							</a>
							<a href="#" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400">
								<FaInstagram className="h-5 w-5" />
							</a>
							<a href="#" className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400">
								<FaGithub className="h-5 w-5" />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
						<ul className="space-y-2">
							{quickLinks.map((link) => (
								<li key={link.path}>
									<Link
										to={link.path}
										className="text-sm text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
									>
										{link.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Categories */}
					<div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
						<ul className="space-y-2">
							{categories.map((category) => (
								<li key={category.path}>
									<Link
										to={category.path}
										className="text-sm text-gray-600 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors"
									>
										{category.name}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact Info */}
					<div>
						<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
						<ul className="space-y-3">
							<li className="flex items-start gap-3">
								<MapPin className="h-5 w-5 text-purple-600 mt-0.5" />
								<span className="text-sm text-gray-600 dark:text-gray-400">
									123 Smart Street, Digital City, DC 12345
								</span>
							</li>
							<li className="flex items-center gap-3">
								<Phone className="h-5 w-5 text-purple-600" />
								<span className="text-sm text-gray-600 dark:text-gray-400">+1 234 567 8900</span>
							</li>
							<li className="flex items-center gap-3">
								<Mail className="h-5 w-5 text-purple-600" />
								<span className="text-sm text-gray-600 dark:text-gray-400">support@smartstore.com</span>
							</li>
						</ul>
					</div>
				</div>

				{/* Newsletter Section */}
				<div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
					<div className="flex flex-col items-center justify-between gap-4 md:flex-row">
						<div>
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white">Subscribe to our Newsletter</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400">
								Get the latest updates on new products and upcoming sales
							</p>
						</div>
						<div className="flex w-full max-w-md gap-2">
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
							/>
							<button className="rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 text-sm font-medium text-white transition-all hover:opacity-90">
								Subscribe
							</button>
						</div>
					</div>
				</div>

				{/* Bottom Bar */}
				<div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 text-center">
					<p className="text-sm text-gray-600 dark:text-gray-400">
						© {currentYear} Smart Store. All rights reserved. Built with ❤️ for better shopping experience.
					</p>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
