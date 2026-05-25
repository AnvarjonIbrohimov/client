import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

interface Member {
	_id: string;
	memberNick: string;
	memberImage?: string;
}

interface AuthContextType {
	user: Member | null;
	login: (userData: Member, token: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<Member | null>(null);

	useEffect(() => {
		const storedUser = localStorage.getItem('user');

		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	const login = (userData: Member, token: string) => {
		localStorage.setItem('user', JSON.stringify(userData));
		localStorage.setItem('token', token);

		setUser(userData);
	};

	const logout = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('token');

		setUser(null);
	};

	return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth must be used inside AuthProvider');
	}

	return context;
}
