import { useState } from 'react';
import {
	ShoppingBag,
	Clock,
	Loader,
	CheckCircle,
	ChevronRight,
	Trash2,
	CreditCard,
	PackageCheck,
	Tag,
	Calendar,
} from 'lucide-react';
import { useOrders, type OrderStatus } from '../context/OrderContext';
import '../css/orders.css';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const STATUS_TABS: { value: OrderStatus; label: string; icon: React.ReactNode }[] = [
	{ value: 'paused', label: 'Paused', icon: <Clock size={14} strokeWidth={2} /> },
	{ value: 'process', label: 'Process', icon: <Loader size={14} strokeWidth={2} /> },
	{ value: 'finished', label: 'Finished', icon: <CheckCircle size={14} strokeWidth={2} /> },
];

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

// ─── ConfirmModal ─────────────────────────────────────────────────────────────
function ConfirmModal({
	title,
	description,
	confirmLabel,
	onConfirm,
	onCancel,
	variant,
}: {
	title: string;
	description: string;
	confirmLabel: string;
	onConfirm: () => void;
	onCancel: () => void;
	variant: 'primary' | 'success';
}) {
	return (
		<div className="modal-overlay">
			<div className="modal">
				<div className={`modal__icon-wrap modal__icon-wrap--${variant}`}>
					{variant === 'primary' ? (
						<CreditCard size={22} strokeWidth={2} />
					) : (
						<PackageCheck size={22} strokeWidth={2} />
					)}
				</div>
				<h3 className="modal__title">{title}</h3>
				<p className="modal__desc">{description}</p>
				<div className="modal__actions">
					<button className="modal__cancel" onClick={onCancel}>
						Cancel
					</button>
					<button className={`modal__confirm modal__confirm--${variant}`} onClick={onConfirm}>
						{confirmLabel}
					</button>
				</div>
			</div>
		</div>
	);
}

// ─── StatusBadge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: OrderStatus }) {
	return (
		<span className={`status-badge status-badge--${status}`}>
			{status === 'paused' && <Clock size={10} strokeWidth={2.5} />}
			{status === 'process' && <Loader size={10} strokeWidth={2.5} />}
			{status === 'finished' && <CheckCircle size={10} strokeWidth={2.5} />}
			{status.charAt(0).toUpperCase() + status.slice(1)}
		</span>
	);
}

// ─── StepIndicator ────────────────────────────────────────────────────────────
function StepIndicator({ status }: { status: OrderStatus }) {
	const steps: OrderStatus[] = ['paused', 'process', 'finished'];
	const currentIdx = steps.indexOf(status);

	return (
		<div className="step-indicator">
			{steps.map((step, i) => (
				<div key={step} className="step-indicator__item">
					<div className={`step-indicator__dot ${i <= currentIdx ? 'active' : ''} ${i < currentIdx ? 'done' : ''}`}>
						{i < currentIdx ? <CheckCircle size={10} strokeWidth={3} /> : <span>{i + 1}</span>}
					</div>
					<span className={`step-indicator__label ${i <= currentIdx ? 'active' : ''}`}>
						{step.charAt(0).toUpperCase() + step.slice(1)}
					</span>
					{i < steps.length - 1 && <div className={`step-indicator__line ${i < currentIdx ? 'done' : ''}`} />}
				</div>
			))}
		</div>
	);
}

// ─── OrderCard ────────────────────────────────────────────────────────────────
function OrderCard({ order }: { order: ReturnType<typeof useOrders>['orders'][0] }) {
	const { updateStatus, removeOrder } = useOrders();
	const [modal, setModal] = useState<'pay' | 'receive' | null>(null);

	return (
		<>
			<div className={`order-card order-card--${order.status}`}>
				{/* Image */}
				<div className="order-card__img-wrap">
					<img src={order.image} alt={order.name} className="order-card__img" />
					<StatusBadge status={order.status} />
				</div>

				{/* Content */}
				<div className="order-card__body">
					<div className="order-card__top">
						<div>
							<h3 className="order-card__name">{order.name}</h3>
							<div className="order-card__meta">
								<span className="order-card__meta-item">
									<Tag size={11} strokeWidth={2} />
									{order.collection}
								</span>
								{order.size && <span className="order-card__meta-item">Size: {order.size}</span>}
								<span className="order-card__meta-item">
									<Calendar size={11} strokeWidth={2} />
									{formatDate(order.createdAt)}
								</span>
							</div>
						</div>
						<div className="order-card__right">
							<span className="order-card__price">{(order.price ?? 0).toLocaleString()} $</span>
							<button className="order-card__delete" onClick={() => removeOrder(order.id)} aria-label="Remove order">
								<Trash2 size={13} strokeWidth={2} />
							</button>
						</div>
					</div>

					{/* Step indicator */}
					<StepIndicator status={order.status} />

					{/* Action button */}
					<div className="order-card__action">
						{order.status === 'paused' && (
							<button className="order-card__btn order-card__btn--pay" onClick={() => setModal('pay')}>
								<CreditCard size={14} strokeWidth={2} />
								Buy Now
								<ChevronRight size={14} strokeWidth={2.5} />
							</button>
						)}
						{order.status === 'process' && (
							<button className="order-card__btn order-card__btn--receive" onClick={() => setModal('receive')}>
								<PackageCheck size={14} strokeWidth={2} />
								Confirm Receipt
								<ChevronRight size={14} strokeWidth={2.5} />
							</button>
						)}
						{order.status === 'finished' && (
							<div className="order-card__done">
								<CheckCircle size={14} strokeWidth={2} />
								Order completed
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Pay modal */}
			{modal === 'pay' && (
				<ConfirmModal
					title="Confirm Payment"
					description="Would you like to proceed with the payment for this order?"
					confirmLabel="Yes, Pay Now"
					variant="primary"
					onCancel={() => setModal(null)}
					onConfirm={() => {
						updateStatus(order.id, 'process');
						setModal(null);
					}}
				/>
			)}

			{/* Receive modal */}
			{modal === 'receive' && (
				<ConfirmModal
					title="Confirm Receipt"
					description="Have you received your order and everything is in order?"
					confirmLabel="Yes, Received"
					variant="success"
					onCancel={() => setModal(null)}
					onConfirm={() => {
						updateStatus(order.id, 'finished');
						setModal(null);
					}}
				/>
			)}
		</>
	);
}

// ─── Orders ───────────────────────────────────────────────────────────────────
function Orders() {
	const { orders } = useOrders();
	const [activeTab, setActiveTab] = useState<OrderStatus>('paused');

	const filtered = orders.filter((o) => o.status === activeTab);
	const countByTab = (s: OrderStatus) => orders.filter((o) => o.status === s).length;

	return (
		<section className="orders-page">
			{/* ── Header ── */}
			<div className="orders-header">
				<div className="orders-header__left">
					<ShoppingBag size={20} strokeWidth={2} />
					<h2 className="orders-header__title">My Orders</h2>
					<span className="orders-header__total">{orders.length} total</span>
				</div>
			</div>

			{/* ── Tabs ── */}
			<div className="orders-tabs">
				{STATUS_TABS.map(({ value, label, icon }) => (
					<button
						key={value}
						className={`orders-tab${activeTab === value ? ' active' : ''} orders-tab--${value}`}
						onClick={() => setActiveTab(value)}
					>
						{icon}
						{label}
						{countByTab(value) > 0 && <span className="orders-tab__badge">{countByTab(value)}</span>}
					</button>
				))}
			</div>

			{/* ── List ── */}
			<div className="orders-list">
				{filtered.length > 0 ? (
					filtered.map((order) => <OrderCard key={order.id} order={order} />)
				) : (
					<div className="orders-empty">
						<ShoppingBag size={36} strokeWidth={1.5} />
						<p className="orders-empty__title">No {activeTab} orders</p>
						<p className="orders-empty__sub">
							{activeTab === 'paused' && 'Add products to cart to see them here.'}
							{activeTab === 'process' && 'Orders in progress will appear here.'}
							{activeTab === 'finished' && 'Completed orders will appear here.'}
						</p>
					</div>
				)}
			</div>
		</section>
	);
}

export default Orders;
