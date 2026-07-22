import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { BASE_URL } from '../libs/config';
import '../css/Auth.css';

const getAuthErrorMessage = (err: unknown, fallback: string) => {
	if (axios.isAxiosError<{ message?: string }>(err)) {
		return err.response?.data?.message ?? fallback;
	}
	return fallback;
};

function Login() {
	const { login } = useAuth();
	const navigate = useNavigate();

	const [form, setForm] = useState({ memberNick: '', memberPassword: '' });
	const [showPw, setShowPw] = useState(false);
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setError('');
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		if (!form.memberNick.trim() || !form.memberPassword.trim()) {
			setError('Please fill in all fields.');
			return;
		}
		setLoading(true);
		try {
			const { data } = await axios.post(`${BASE_URL}/member/login`, {
				memberNick: form.memberNick,
				memberPassword: form.memberPassword,
			});
			// backend: { member: {...}, accessToken: "..." }
			const member = data.data.member;
			const accessToken = data.data.accessToken;

			login(member, accessToken);
			navigate('/');
		} catch (err: unknown) {
			setError(getAuthErrorMessage(err, 'Incorrect nickname or password.'));
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-page">
			<div className="auth-card">
				{/* Brand */}
				<div className="auth-brand">
					<div className="auth-brand__dot">
						<ArrowRight size={14} color="#fff" strokeWidth={2.5} />
					</div>
					<div>
						<p className="auth-brand__name">
							Smart<span>Store</span>
						</p>
						<p className="auth-brand__sub">Online shop</p>
					</div>
				</div>

				<h1 className="auth-title">Welcome back</h1>
				<p className="auth-desc">Sign in to your account</p>

				{error && <div className="auth-error">{error}</div>}

				<form className="auth-form" onSubmit={handleSubmit} noValidate>
					<div className="auth-field">
						<label className="auth-field__label">
							<User size={12} strokeWidth={2.5} />
							Nickname
						</label>
						<input
							type="text"
							name="memberNick"
							value={form.memberNick}
							onChange={handleChange}
							placeholder="Your nickname"
							className="auth-field__input"
							autoComplete="username"
							autoFocus
						/>
					</div>

					<div className="auth-field">
						<label className="auth-field__label">
							<Lock size={12} strokeWidth={2.5} />
							Password
						</label>
						<div className="auth-field__pw-wrap">
							<input
								type={showPw ? 'text' : 'password'}
								name="memberPassword"
								value={form.memberPassword}
								onChange={handleChange}
								placeholder="••••••••"
								className="auth-field__input"
								autoComplete="current-password"
							/>
							<button type="button" className="auth-field__pw-toggle" onClick={() => setShowPw((v) => !v)}>
								{showPw ? <EyeOff size={15} strokeWidth={2} /> : <Eye size={15} strokeWidth={2} />}
							</button>
						</div>
					</div>

					<button type="submit" className={`auth-submit${loading ? ' loading' : ''}`} disabled={loading}>
						{loading ? (
							<span className="auth-submit__spinner" />
						) : (
							<>
								Sign in <ArrowRight size={15} strokeWidth={2.5} />
							</>
						)}
					</button>
				</form>

				<p className="auth-footer">
					Don't have an account? <Link to="/signup">Sign up</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
