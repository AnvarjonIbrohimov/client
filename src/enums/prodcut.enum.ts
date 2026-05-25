export const ProductCollection = {
	POPULAR: 'POPULAR',
	NEW: 'NEW',
	SALE: 'SALE',
	REGULAR: 'REGULAR',
} as const;

export type ProductCollection = (typeof ProductCollection)[keyof typeof ProductCollection];

export const ProductSize = {
	XS: 'XS',
	S: 'S',
	M: 'M',
	L: 'L',
	XL: 'XL',
	XXL: 'XXL',
} as const;

export type ProductSize = (typeof ProductSize)[keyof typeof ProductSize];

export const ProductCategory = {
	MEN: 'MEN',
	WOMEN: 'WOMEN',
	KIDS: 'KIDS',
	ELECTRONICS: 'ELECTRONICS',
	BOOKS: 'BOOKS',
} as const;

export type ProductCategory = (typeof ProductCategory)[keyof typeof ProductCategory];
