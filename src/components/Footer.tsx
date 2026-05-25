import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShoppingBag, Shield, Truck, Headphones } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

function Footer() {
	const currentYear = new Date().getFullYear();

	const quickLinks = [
		{ name: 'About Us', path: '/about' },
		{ name: 'Contact', path: '/contact' },
		{ name: 'Privacy Policy', path: '/privacy' },
		{ name: 'Terms', path: '/terms' },
	];

	const categories = [
		{ name: 'Electronics', path: '/products?category=electronics' },
		{ name: 'Clothing', path: '/products?category=clothing' },
		{ name: 'Books', path: '/products?category=books' },
	];

	return (
		<footer className="footer">
			{/* FEATURES */}
			<div className="footer-features">
				<div className="container features-grid">
					<div className="feature">
						<Truck /> Free Shipping
					</div>
					<div className="feature">
						<Shield /> Secure Payment
					</div>
					<div className="feature">
						<Headphones /> Support
					</div>
					<div className="feature">
						<ShoppingBag /> Best Prices
					</div>
				</div>
			</div>

			{/* MAIN */}
			<div className="container footer-main">
				<div className="footer-col">
					<h2>Smart Store</h2>
					<p>Smart shopping experience</p>

					<div className="socials">
						<FaFacebook />
						<FaTwitter />
						<FaInstagram />
						<FaGithub />
					</div>
				</div>

				<div className="footer-col">
					<h3>Links</h3>
					{quickLinks.map((l) => (
						<Link key={l.path} to={l.path}>
							{l.name}
						</Link>
					))}
				</div>

				<div className="footer-col">
					<h3>Categories</h3>
					{categories.map((c) => (
						<Link key={c.path} to={c.path}>
							{c.name}
						</Link>
					))}
				</div>

				<div className="footer-col">
					<h3>Contact</h3>
					<p>
						<MapPin /> Address
					</p>
					<p>
						<Phone /> Phone
					</p>
					<p>
						<Mail /> Email
					</p>
				</div>
			</div>

			<div className="footer-bottom">
				<p>© {currentYear} Smart Store</p>
			</div>
		</footer>
	);
}

export default Footer;
