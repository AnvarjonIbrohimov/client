import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Phone, Lock, ArrowRight, Eye, EyeOff, UserPlus } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { BASE_URL } from '../libs/config';
import '../css/Auth.css';

function Signup() {
	const { login } = useAuth();
	const navigate = useNavigate();

	const [form, setForm] = useState({
		memberNick: '',
		memberPhone: '',
		memberPassword: '',
		confirmPw: '',
	});
	const [showPw, setShowPw] = useState(false);
	const [showCPw, setShowCPw] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [loading, setLoading] = useState(false);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const validate = () => {
		const errs: Record<string, string> = {};
		if (!form.memberNick.trim()) errs.memberNick = 'Nickname is required.';
		if (!form.memberPhone.trim()) errs.memberPhone = 'Phone number is required.';
		if (!form.memberPassword) errs.memberPassword = 'Password is required.';
		else if (form.memberPassword.length < 8) errs.memberPassword = 'At least 8 characters.';
		if (form.memberPassword !== form.confirmPw) errs.confirmPw = 'Passwords do not match.';
		return errs;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		const errs = validate();
		if (Object.keys(errs).length) {
			setErrors(errs);
			return;
		}

		setLoading(true);
		try {
			const { data } = await axios.post(`${BASE_URL}/member/signup`, {
				memberNick: form.memberNick,
				memberPhone: form.memberPhone,
				memberPassword: form.memberPassword,
			});

			const member = data.member ?? data.data?.member ?? data;
			const accessToken = data.accessToken ?? data.data?.accessToken ?? data.token;

			login(member, accessToken);
			navigate('/');
		} catch (err: any) {
			const msg = err?.response?.data?.message ?? 'Something went wrong. Please try again.';
			setErrors({ general: msg });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-page">
			<div className="auth-card">
				<div className="auth-brand">
					<div className="auth-brand__dot">
						<UserPlus size={14} color="#fff" strokeWidth={2.5} />
					</div>
					<div>
						<p className="auth-brand__name">
							Smart<span>Store</span>
						</p>
						<p className="auth-brand__sub">Online shop</p>
					</div>
				</div>

				<h1 className="auth-title">Create account</h1>
				<p className="auth-desc">Join Smart Store today</p>

				{errors.general && <div className="auth-error">{errors.general}</div>}

				<form className="auth-form" onSubmit={handleSubmit} noValidate>
					<div className="auth-field">
						<label className="auth-field__label">
							<User size={12} strokeWidth={2.5} /> Nickname
						</label>
						<input
							type="text"
							name="memberNick"
							value={form.memberNick}
							onChange={handleChange}
							placeholder="Choose a nickname"
							className={`auth-field__input${errors.memberNick ? ' error' : ''}`}
							autoFocus
						/>
						{errors.memberNick && <p className="auth-field__error">{errors.memberNick}</p>}
					</div>

					<div className="auth-field">
						<label className="auth-field__label">
							<Phone size={12} strokeWidth={2.5} /> Phone number
						</label>
						<div className="auth-field__phone-wrap">
							<span className="auth-field__prefix">+82</span>
							<input
								type="tel"
								name="memberPhone"
								value={form.memberPhone}
								onChange={handleChange}
								placeholder="10 0000 0000"
								className={`auth-field__input auth-field__input--phone${errors.memberPhone ? ' error' : ''}`}
							/>
						</div>
						{errors.memberPhone && <p className="auth-field__error">{errors.memberPhone}</p>}
					</div>

					<div className="auth-field">
						<label className="auth-field__label">
							<Lock size={12} strokeWidth={2.5} /> Password
						</label>
						<div className="auth-field__pw-wrap">
							<input
								type={showPw ? 'text' : 'password'}
								name="memberPassword"
								value={form.memberPassword}
								onChange={handleChange}
								placeholder="Min. 8 characters"
								className={`auth-field__input${errors.memberPassword ? ' error' : ''}`}
								autoComplete="new-password"
							/>
							<button type="button" className="auth-field__pw-toggle" onClick={() => setShowPw((v) => !v)}>
								{showPw ? <EyeOff size={15} strokeWidth={2} /> : <Eye size={15} strokeWidth={2} />}
							</button>
						</div>
						{errors.memberPassword && <p className="auth-field__error">{errors.memberPassword}</p>}
					</div>

					<div className="auth-field">
						<label className="auth-field__label">
							<Lock size={12} strokeWidth={2.5} /> Confirm password
						</label>
						<div className="auth-field__pw-wrap">
							<input
								type={showCPw ? 'text' : 'password'}
								name="confirmPw"
								value={form.confirmPw}
								onChange={handleChange}
								placeholder="Repeat password"
								className={`auth-field__input${errors.confirmPw ? ' error' : ''}`}
								autoComplete="new-password"
							/>
							<button type="button" className="auth-field__pw-toggle" onClick={() => setShowCPw((v) => !v)}>
								{showCPw ? <EyeOff size={15} strokeWidth={2} /> : <Eye size={15} strokeWidth={2} />}
							</button>
						</div>
						{errors.confirmPw && <p className="auth-field__error">{errors.confirmPw}</p>}
					</div>

					<button type="submit" className={`auth-submit${loading ? ' loading' : ''}`} disabled={loading}>
						{loading ? (
							<span className="auth-submit__spinner" />
						) : (
							<>
								Create account <ArrowRight size={15} strokeWidth={2.5} />
							</>
						)}
					</button>
				</form>

				<p className="auth-footer">
					Already have an account? <Link to="/login">Sign in</Link>
				</p>
			</div>
		</div>
	);
}

export default Signup;
