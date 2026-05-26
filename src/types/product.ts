import { ProductCategory, ProductCollection, type ProductSize } from '../enums/prodcut.enum';

// ─── Types ──────────────────────────────────────────────────────────────────
export interface Product {
	id: number;
	name: string;
	price: number;
	image?: string;
	images?: string[];
	collection: ProductCollection;
	category: ProductCategory;
	sizes?: ProductSize[];
	description?: string; // ← qo'shing
	rating?: number; // ← qo'shing
	reviews?: number; // ← qo'shing
	inStock?: boolean; // ← qo'shing
}

// ─── Constants ───────────────────────────────────────────────────────────────
export const CATEGORIES: { value: ProductCategory; label: string }[] = [
	{ value: ProductCategory.MEN, label: 'Men' },
	{ value: ProductCategory.WOMEN, label: 'Women' },
	{ value: ProductCategory.KIDS, label: 'Kids' },
	{ value: ProductCategory.ELECTRONICS, label: 'Electronics' },
	{ value: ProductCategory.BOOKS, label: 'Books' },
];

export const COLLECTIONS: { value: ProductCollection; label: string; color: string }[] = [
	{ value: ProductCollection.POPULAR, label: 'Popular', color: '#FF6B35' },
	{ value: ProductCollection.NEW, label: 'New', color: '#1DB954' },
	{ value: ProductCollection.SALE, label: 'Sale', color: '#E63946' },
	{ value: ProductCollection.REGULAR, label: 'Regular', color: '#4A90D9' },
];

export const BADGE_COLORS: Record<ProductCollection, string> = {
	[ProductCollection.POPULAR]: '#FF6B35',
	[ProductCollection.NEW]: '#1DB954',
	[ProductCollection.SALE]: '#E63946',
	[ProductCollection.REGULAR]: '#4A90D9',
};

export const SIZE_CATEGORIES = new Set<ProductCategory>([
	ProductCategory.MEN,
	ProductCategory.WOMEN,
	ProductCategory.KIDS,
]);
