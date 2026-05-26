import { useState } from 'react';
import {
	Package,
	Truck,
	RefreshCw,
	CreditCard,
	User,
	Shirt,
	Search,
	X,
	ChevronDown,
	Phone,
	Mail,
} from 'lucide-react';
import '../css/Help.css';
import type { FaqCategory, FaqItem } from '../types/FAQ';


// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const FAQ_CATEGORIES: FaqCategory[] = [
	{
		id: 'orders',
		label: 'Orders',
		icon: <Package size={15} />,
		items: [
			{
				id: 1,
				question: 'How do I place an order?',
				answer:
					'Browse our products, select your size and quantity, then click "Add to Cart". When ready, go to your cart and click "Checkout". Fill in your shipping details and payment information to complete.',
			},
			{
				id: 2,
				question: 'Can I modify or cancel my order after placing?',
				answer:
					'You can modify or cancel within 1 hour of placing. After that, the order enters fulfillment and changes may not be possible. Contact support at contact@smartstore.kr immediately.',
			},
			{
				id: 3,
				question: 'How do I track my order?',
				answer:
					'Once shipped, you\'ll receive a confirmation email with a tracking number. Use it under "My Orders" on our website or on the courier\'s website to track in real time.',
			},
			{
				id: 4,
				question: 'What if my order is lost or damaged?',
				answer:
					"Contact us within 7 days of the expected delivery date. We'll investigate with the courier and either send a replacement or issue a full refund.",
			},
		],
	},
	{
		id: 'shipping',
		label: 'Shipping',
		icon: <Truck size={15} />,
		items: [
			{
				id: 5,
				question: 'What are the shipping options and costs?',
				answer:
					'Standard Shipping (5–7 days, free over $50), Express Shipping (2–3 days, $9.99), Same-Day Delivery in Seoul only ($14.99).',
			},
			{
				id: 6,
				question: 'Do you ship internationally?',
				answer:
					"Yes! We ship to over 50 countries. International shipping takes 7–14 business days. Import duties may apply and are the recipient's responsibility.",
			},
			{
				id: 7,
				question: 'How long does delivery take?',
				answer:
					'Domestic orders within South Korea: 1–3 business days. Express orders placed before 2 PM: next business day. International: 7–14 business days.',
			},
		],
	},
	{
		id: 'returns',
		label: 'Returns',
		icon: <RefreshCw size={15} />,
		items: [
			{
				id: 8,
				question: 'What is your return policy?',
				answer:
					'We accept returns within 30 days of delivery. Items must be unused, unwashed, and in original packaging with all tags attached. Sale items and underwear are non-returnable.',
			},
			{
				id: 9,
				question: 'How do I return an item?',
				answer:
					'Go to "My Orders", select the item, click "Request Return". Choose your reason, print the prepaid label, pack securely, and drop off at any courier location.',
			},
			{
				id: 10,
				question: 'Can I exchange for a different size?',
				answer:
					'Yes! Exchanges are free within 30 days. Go to "My Orders", select the item, choose "Exchange" and select your new size or color.',
			},
			{
				id: 11,
				question: 'How long does a refund take?',
				answer:
					'Once we receive and inspect your return, refunds are processed within 3–5 business days and appear on your payment method within 5–10 business days.',
			},
		],
	},
	{
		id: 'payment',
		label: 'Payment',
		icon: <CreditCard size={15} />,
		items: [
			{
				id: 12,
				question: 'What payment methods do you accept?',
				answer:
					'Visa, MasterCard, Amex, PayPal, Apple Pay, Google Pay, and bank transfers. All transactions are secured with SSL encryption.',
			},
			{
				id: 13,
				question: 'Is my payment information secure?',
				answer:
					'Absolutely. We use SSL encryption and never store full card details on our servers. All payments go through PCI-DSS compliant gateways.',
			},
			{
				id: 14,
				question: 'Do you offer installment payments?',
				answer:
					'For orders over $100, we offer 3, 6, or 12-month plans through Klarna. Select "Pay in Installments" at checkout to see available options.',
			},
		],
	},
	{
		id: 'account',
		label: 'Account',
		icon: <User size={15} />,
		items: [
			{
				id: 15,
				question: 'How do I create an account?',
				answer:
					'Click "Sign Up", enter your email and create a password — or sign up with Google or Facebook for faster access. Verify your email and you\'re ready to shop.',
			},
			{
				id: 16,
				question: 'I forgot my password. What do I do?',
				answer:
					'Click "Forgot Password" on the login page and enter your email. You\'ll receive a reset link within minutes. Check your spam folder if you don\'t see it.',
			},
			{
				id: 17,
				question: 'How do I update my personal information?',
				answer:
					'Log in, go to "Profile Settings", and update your name, email, phone, or address. Changes are saved instantly.',
			},
		],
	},
	{
		id: 'products',
		label: 'Products',
		icon: <Shirt size={15} />,
		items: [
			{
				id: 18,
				question: 'How do I find the right size?',
				answer:
					"Each product page has a size guide. Click it to see measurements in cm and inches. If you're between sizes, we recommend sizing up.",
			},
			{
				id: 19,
				question: 'Are the product colors accurate?',
				answer:
					'We display colors as accurately as possible, but slight variations may occur due to different monitor settings. Check the product description for details.',
			},
			{
				id: 20,
				question: 'How do I know if an item is in stock?',
				answer:
					'In-stock items show the "Add to Cart" button. Out-of-stock sizes are grayed out. Click "Notify Me" to get an email when they\'re back.',
			},
		],
	},
];

// ─── AccordionItem ────────────────────────────────────────────────────────────
function AccordionItem({ item, isOpen, onToggle }: { item: FaqItem; isOpen: boolean; onToggle: () => void }) {
	return (
		<div className={`faq-item${isOpen ? ' open' : ''}`}>
			<button className="faq-item__question" onClick={onToggle}>
				<span>{item.question}</span>
				<span className="faq-item__chevron">
					<ChevronDown size={16} strokeWidth={2.5} />
				</span>
			</button>
			<div className="faq-item__answer-wrap">
				<p className="faq-item__answer">{item.answer}</p>
			</div>
		</div>
	);
}

// ─── Help ─────────────────────────────────────────────────────────────────────
function Help() {
	const [activeCategory, setActiveCategory] = useState<string>('orders');
	const [openId, setOpenId] = useState<number | null>(1);
	const [search, setSearch] = useState('');

	const currentCategory = FAQ_CATEGORIES.find((c) => c.id === activeCategory)!;

	const filteredItems = search.trim()
		? FAQ_CATEGORIES.flatMap((c) =>
				c.items.filter(
					(item) =>
						item.question.toLowerCase().includes(search.toLowerCase()) ||
						item.answer.toLowerCase().includes(search.toLowerCase()),
				),
			)
		: currentCategory.items;

	const handleToggle = (id: number) => setOpenId((prev) => (prev === id ? null : id));

	const handleSearch = (val: string) => {
		setSearch(val);
		setOpenId(null);
	};

	const handleCategoryChange = (id: string) => {
		setActiveCategory(id);
		setOpenId(null);
	};

	return (
		<section className="help-page">
			{/* ── Hero ── */}
			<div className="help-hero">
				<h1 className="help-hero__title">Help Center</h1>
				<p className="help-hero__desc">Find answers to the most common questions about shopping with us.</p>
				<div className="help-hero__search-wrap">
					<Search className="help-hero__search-icon" size={15} strokeWidth={2.5} />
					<input
						type="text"
						className="help-hero__search"
						placeholder="Search for answers..."
						value={search}
						onChange={(e) => handleSearch(e.target.value)}
					/>
					{search && (
						<button className="help-hero__clear" onClick={() => handleSearch('')} aria-label="Clear search">
							<X size={14} strokeWidth={2.5} />
						</button>
					)}
				</div>
			</div>

			{/* ── Body ── */}
			<div className="help-body">
				{/* Sidebar */}
				{!search && (
					<aside className="help-sidebar">
						{FAQ_CATEGORIES.map((cat) => (
							<button
								key={cat.id}
								className={`help-sidebar__btn${activeCategory === cat.id ? ' active' : ''}`}
								onClick={() => handleCategoryChange(cat.id)}
							>
								<span className="help-sidebar__icon">{cat.icon}</span>
								<span>{cat.label}</span>
								<span className="help-sidebar__count">{cat.items.length}</span>
							</button>
						))}
					</aside>
				)}

				{/* FAQ list */}
				<div className="help-content">
					{search ? (
						<p className="help-content__search-label">
							{filteredItems.length} result{filteredItems.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
						</p>
					) : (
						<div className="help-content__header">
							<span className="help-content__cat-icon">{currentCategory.icon}</span>
							<h2 className="help-content__cat-title">{currentCategory.label}</h2>
							<span className="help-content__cat-count">{currentCategory.items.length} questions</span>
						</div>
					)}

					<div className="faq-list">
						{filteredItems.length > 0 ? (
							filteredItems.map((item) => (
								<AccordionItem
									key={item.id}
									item={item}
									isOpen={openId === item.id}
									onToggle={() => handleToggle(item.id)}
								/>
							))
						) : (
							<div className="help-content__empty">
								No results found. Try a different keyword or browse the categories.
							</div>
						)}
					</div>
				</div>
			</div>

			{/* ── Contact strip ── */}
			<div className="help-contact">
				<p className="help-contact__text">Still have questions?</p>
				<div className="help-contact__btns">
					<a href="mailto:contact@smartstore.kr" className="help-contact__btn help-contact__btn--primary">
						<Mail size={14} strokeWidth={2.5} />
						Email Support
					</a>
					<a href="tel:+82-2-1234-5678" className="help-contact__btn help-contact__btn--secondary">
						<Phone size={14} strokeWidth={2.5} />
						Call Us
					</a>
				</div>
			</div>
		</section>
	);
}

export default Help;
