import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Member {
	_id: string;
	memberNick: string;
	memberPhone?: string;
	memberEmail?: string;
	memberImage?: string;
	memberAddress?: string;
	memberDesc?: string;
	memberPoints?: number;
	memberType?: string;
	memberStatus?: string;
}

interface AuthContextType {
	user: Member | null;
	token: string | null;
	login: (userData: Member, token: string) => void;
	logout: () => void;
	updateUser: (updated: Partial<Member>) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<Member | null>(() => {
		try {
			const raw = localStorage.getItem('user');
			return raw ? JSON.parse(raw) : null;
		} catch {
			return null;
		}
	});

	const [token, setToken] = useState<string | null>(() => {
		return localStorage.getItem('token');
	});

	useEffect(() => {
		if (user) localStorage.setItem('user', JSON.stringify(user));
	}, [user]);

	const login = (userData: Member, accessToken: string) => {
		localStorage.setItem('user', JSON.stringify(userData));
		localStorage.setItem('token', accessToken);
		setUser(userData);
		setToken(accessToken);
	};

	const logout = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		setUser(null);
		setToken(null);
	};

	const updateUser = (updated: Partial<Member>) => {
		setUser((prev) => {
			if (!prev) return prev;
			const next = { ...prev, ...updated };
			localStorage.setItem('user', JSON.stringify(next));
			return next;
		});
	};

	return <AuthContext.Provider value={{ user, token, login, logout, updateUser }}>{children}</AuthContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
	return ctx;
}
