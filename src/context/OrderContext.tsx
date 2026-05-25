import { createContext, useContext, useEffect, useState,type ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
export type OrderStatus = 'paused' | 'process' | 'finished';

export interface OrderItem {
	id: string; // unique order id
	productId: number;
	name: string;
	price: number;
	image: string;
	collection: string;
	category: string;
	size?: string;
	status: OrderStatus;
	createdAt: string;
	updatedAt: string;
}

interface OrderContextValue {
	orders: OrderItem[];
	addOrder: (product: Omit<OrderItem, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => void;
	updateStatus: (id: string, status: OrderStatus) => void;
	removeOrder: (id: string) => void;
	isOrdered: (productId: number) => boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const OrderContext = createContext<OrderContextValue | null>(null);

const LS_KEY = 'smartstore_orders';

// ─── Provider ─────────────────────────────────────────────────────────────────
export function OrderProvider({ children }: { children: ReactNode }) {
	const [orders, setOrders] = useState<OrderItem[]>(() => {
		try {
			const raw = localStorage.getItem(LS_KEY);
			return raw ? JSON.parse(raw) : [];
		} catch {
			return [];
		}
	});

	// sync to localStorage on every change
	useEffect(() => {
		localStorage.setItem(LS_KEY, JSON.stringify(orders));
	}, [orders]);

	const addOrder = (product: Omit<OrderItem, 'id' | 'status' | 'createdAt' | 'updatedAt'>) => {
		const now = new Date().toISOString();
		const newOrder: OrderItem = {
			...product,
			id: crypto.randomUUID(),
			status: 'paused',
			createdAt: now,
			updatedAt: now,
		};
		setOrders((prev) => [newOrder, ...prev]);
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
