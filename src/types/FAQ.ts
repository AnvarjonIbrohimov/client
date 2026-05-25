// ─── Types ────────────────────────────────────────────────────────────────────
export interface FaqItem {
	id: number;
	question: string;
	answer: string;
}

export interface FaqCategory {
	id: string;
	label: string;
	icon: React.ReactNode;
	items: FaqItem[];
}
