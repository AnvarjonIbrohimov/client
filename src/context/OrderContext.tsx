import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { api } from '../libs/config';
import { useQueryClient } from '@tanstack/react-query';

// ─── Types ────────────────────────────────────────────────────────────────────
export type OrderStatus = 'paused' | 'process' | 'finished';

export interface OrderItem {
	id: string;
	productId: number;
	name: string;
	price: number;
	image?: string;
	collection: string;
	category: string;
	size?: string;
	status: OrderStatus;
	createdAt: string;
	updatedAt: string;
}

interface OrderContextValue {
	orders: OrderItem[];
	addOrder: (product: Omit<OrderItem, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => Promise<void>;
	updateStatus: (id: string, status: OrderStatus) => void;
	removeOrder: (id: string) => void;
	isOrdered: (productId: number) => boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const OrderContext = createContext<OrderContextValue | null>(null);

const LS_KEY = 'smartstore_orders';

// ─── Provider ─────────────────────────────────────────────────────────────────
export function OrderProvider({ children }: { children: ReactNode }) {
	const { user, updateUser } = useAuth();
	const queryClient = useQueryClient();

	const [orders, setOrders] = useState<OrderItem[]>(() => {
		try {
			const raw = localStorage.getItem(LS_KEY);
			return raw ? JSON.parse(raw) : [];
		} catch {
			return [];
		}
	});

	useEffect(() => {
		localStorage.setItem(LS_KEY, JSON.stringify(orders));
	}, [orders]);

	const addOrder = async (product: Omit<OrderItem, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
		// login tekshiruvi
		if (!user) {
			window.location.href = '/login';
			return;
		}

		const now = new Date().toISOString();
		const newOrder: OrderItem = {
			...product,
			id: crypto.randomUUID(),
			status: 'paused',
			createdAt: now,
			updatedAt: now,
		};
		setOrders((prev) => [newOrder, ...prev]);

		// backend ga yuborish
		try {
			await api.post('/order/create', {
				deliveryAddress: 'Default Address',
				paymentMethod: 'CARD',
				items: [
					{
						productId: product.productId,
						itemPrice: product.price,
						itemQuantity: 1,
					},
				],
			});

			// backend dan yangilangan member ni oling
			const { data } = await api.get('/member/detail');
			updateUser(data);

			// top-users cache ni yangilash
			queryClient.invalidateQueries({ queryKey: ['top-users'] });
		} catch (err) {
			console.log('Order create error:', err);
		}
	};

	const updateStatus = (id: string, status: OrderStatus) => {
		setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status, updatedAt: new Date().toISOString() } : o)));
	};

	const removeOrder = (id: string) => {
		setOrders((prev) => prev.filter((o) => o.id !== id));
	};

	const isOrdered = (productId: number) => orders.some((o) => o.productId === productId && o.status !== 'finished');

	return (
		<OrderContext.Provider value={{ orders, addOrder, updateStatus, removeOrder, isOrdered }}>
			{children}
		</OrderContext.Provider>
	);
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useOrders() {
	const ctx = useContext(OrderContext);
	if (!ctx) throw new Error('useOrders must be used inside OrderProvider');
	return ctx;
}
