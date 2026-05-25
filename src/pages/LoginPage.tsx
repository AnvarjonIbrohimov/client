import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
	const navigate = useNavigate();
	const { login } = useAuth();

	const [memberNick, setMemberNick] = useState('');
	const [memberPassword, setMemberPassword] = useState('');

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await api.post('/member/login', {
				memberNick,
				memberPassword,
			});

			login(res.data.data.member, res.data.data.accessToken);

			navigate('/');
		} catch (err) {
			console.log(err);
			alert('Login failed');
		}
	};

	return (
		<div className="auth-page">
			<form className="auth-form" onSubmit={handleLogin}>
				<h2>Login</h2>

				<input type="text" placeholder="Nickname" value={memberNick} onChange={(e) => setMemberNick(e.target.value)} />

				<input
					type="password"
					placeholder="Password"
					value={memberPassword}
					onChange={(e) => setMemberPassword(e.target.value)}
				/>

				<button type="submit">Login</button>
			</form>
		</div>
	);
}

export default LoginPage;
