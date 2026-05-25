import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

function SignupPage() {
	const navigate = useNavigate();
	const { login } = useAuth();

	const [form, setForm] = useState({
		memberNick: '',
		memberPhone: '',
		memberPassword: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	};

	const handleSignup = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await api.post('/member/signup', form);

			login(res.data.data.member, res.data.data.accessToken);

			navigate('/');
		} catch (err) {
			console.log(err);
			alert('Signup failed');
		}
	};

	return (
		<div className="auth-page">
			<form className="auth-form" onSubmit={handleSignup}>
				<h2>Signup</h2>

				<input name="memberNick" type="text" placeholder="Nickname" onChange={handleChange} />

				<input name="memberPhone" type="text" placeholder="Phone" onChange={handleChange} />

				<input name="memberPassword" type="password" placeholder="Password" onChange={handleChange} />

				<button type="submit">Signup</button>
			</form>
		</div>
	);
}

export default SignupPage;
