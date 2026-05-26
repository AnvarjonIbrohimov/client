import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Phone, Lock, ArrowRight, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
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
		else if (!/^\d{9,11}$/.test(form.memberPhone.replace(/\s/g, ''))) errs.memberPhone = 'Enter a valid phone number.';
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
			// TODO: replace with real API call
			// const res = await api.post('/member/signup', {
			//   memberNick:     form.memberNick,
			//   memberPhone:    form.memberPhone,
			//   memberPassword: form.memberPassword,
			// });
			// login(res.data.member, res.data.accessToken);
			await new Promise((r) => setTimeout(r, 900));
			login({ _id: 'new-id', memberNick: form.memberNick, memberPhone: form.memberPhone }, 'mock-token');
			navigate('/');
		} catch {
			setErrors({ general: 'Something went wrong. Please try again.' });
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
					{/* Nickname */}
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
							placeholder="Choose a nickname"
							className={`auth-field__input${errors.memberNick ? ' error' : ''}`}
							autoComplete="username"
							autoFocus
						/>
						{errors.memberNick && <p className="auth-field__error">{errors.memberNick}</p>}
					</div>

					{/* Phone */}
					<div className="auth-field">
						<label className="auth-field__label">
							<Phone size={12} strokeWidth={2.5} />
							Phone number
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
								autoComplete="tel"
							/>
						</div>
						{errors.memberPhone && <p className="auth-field__error">{errors.memberPhone}</p>}
					</div>

					{/* Password */}
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
								placeholder="Min. 8 characters"
								className={`auth-field__input${errors.memberPassword ? ' error' : ''}`}
								autoComplete="new-password"
							/>
							<button
								type="button"
								className="auth-field__pw-toggle"
								onClick={() => setShowPw((v) => !v)}
								aria-label={showPw ? 'Hide password' : 'Show password'}
							>
								{showPw ? <EyeOff size={15} strokeWidth={2} /> : <Eye size={15} strokeWidth={2} />}
							</button>
						</div>
						{errors.memberPassword && <p className="auth-field__error">{errors.memberPassword}</p>}
					</div>

					{/* Confirm password */}
					<div className="auth-field">
						<label className="auth-field__label">
							<Lock size={12} strokeWidth={2.5} />
							Confirm password
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
							<button
								type="button"
								className="auth-field__pw-toggle"
								onClick={() => setShowCPw((v) => !v)}
								aria-label={showCPw ? 'Hide password' : 'Show password'}
							>
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
								Create account
								<ArrowRight size={15} strokeWidth={2.5} />
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
