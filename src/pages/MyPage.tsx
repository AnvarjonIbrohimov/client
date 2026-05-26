import { useRef, useState, useEffect, type ChangeEvent } from 'react';
import {
	Camera,
	User,
	Phone,
	Mail,
	MapPin,
	FileText,
	Save,
	Star,
	ShoppingBag,
	CheckCircle,
	Clock,
	Loader,
	Edit3,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { api, BASE_URL } from '../libs/config';
import '../css/MyPage.css';

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({
	src,
	nick,
	onFileChange,
	uploading,
}: {
	src?: string;
	nick: string;
	onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
	uploading: boolean;
}) {
	const fileRef = useRef<HTMLInputElement>(null);
	const initials = nick.slice(0, 2).toUpperCase();

	const imageUrl = src ? (src.startsWith('blob:') || src.startsWith('http') ? src : `${BASE_URL}${src}`) : null;

	return (
		<div className="mp-avatar-wrap">
			<div className="mp-avatar" onClick={() => fileRef.current?.click()}>
				{imageUrl ? (
					<img src={imageUrl} alt={nick} className="mp-avatar__img" />
				) : (
					<span className="mp-avatar__initials">{initials}</span>
				)}
				<div className="mp-avatar__overlay">
					{uploading ? (
						<Loader size={18} strokeWidth={2} className="mp-avatar__spinner" />
					) : (
						<Camera size={18} strokeWidth={2} />
					)}
				</div>
			</div>
			<input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFileChange} />
		</div>
	);
}

// ─── StatCard ─────────────────────────────────────────────────────────────────
function StatCard({
	icon,
	label,
	value,
	color,
}: {
	icon: React.ReactNode;
	label: string;
	value: number | string;
	color: string;
}) {
	return (
		<div className="mp-stat">
			<div className="mp-stat__icon" style={{ color, background: color + '18' }}>
				{icon}
			</div>
			<div>
				<p className="mp-stat__value">{value}</p>
				<p className="mp-stat__label">{label}</p>
			</div>
		</div>
	);
}

// ─── Field ────────────────────────────────────────────────────────────────────
function Field({
	icon,
	label,
	name,
	value,
	type = 'text',
	placeholder,
	onChange,
	textarea,
	disabled,
}: {
	icon: React.ReactNode;
	label: string;
	name: string;
	value: string;
	type?: string;
	placeholder?: string;
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	textarea?: boolean;
	disabled?: boolean;
}) {
	return (
		<div className="mp-field">
			<label className="mp-field__label">
				<span className="mp-field__label-icon">{icon}</span>
				{label}
			</label>
			{textarea ? (
				<textarea
					name={name}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					className="mp-field__input mp-field__textarea"
					rows={3}
					disabled={disabled}
				/>
			) : (
				<input
					type={type}
					name={name}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					className="mp-field__input"
					disabled={disabled}
				/>
			)}
		</div>
	);
}

// ─── MyPage ───────────────────────────────────────────────────────────────────
function MyPage() {
	const { user, updateUser, token } = useAuth();
	const { orders } = useOrders();

	const [form, setForm] = useState({
		memberNick: user?.memberNick ?? '',
		memberPhone: user?.memberPhone ?? '',
		memberEmail: user?.memberEmail ?? '',
		memberAddress: user?.memberAddress ?? '',
		memberDesc: user?.memberDesc ?? '',
	});
	const [preview, setPreview] = useState<string>(user?.memberImage ?? '');
	const [editing, setEditing] = useState(false);
	const [saving, setSaving] = useState(false);
	const [saved, setSaved] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		if (user) {
			setForm({
				memberNick: user.memberNick ?? '',
				memberPhone: user.memberPhone ?? '',
				memberEmail: user.memberEmail ?? '',
				memberAddress: user.memberAddress ?? '',
				memberDesc: user.memberDesc ?? '',
			});
			setPreview(user.memberImage ?? '');
		}
	}, [user]);

	const pausedCount = orders.filter((o) => o.status === 'paused').length;
	const processCount = orders.filter((o) => o.status === 'process').length;
	const finishedCount = orders.filter((o) => o.status === 'finished').length;

	// ── Image upload — darhol backend ga ──────────────────────────────────
	const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// instant preview
		const blobUrl = URL.createObjectURL(file);
		setPreview(blobUrl);
		setUploading(true);
		setError('');

		try {
			const formData = new FormData();
			formData.append('memberImage', file);

			const { data } = await api.post('/member/update', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});

			const updatedImage = data.memberImage ?? data.data?.memberImage;
			if (updatedImage) {
				updateUser({ memberImage: updatedImage });
				setPreview(updatedImage);
			}
		} catch {
			setError('Failed to upload image.');
			setPreview(user?.memberImage ?? '');
		} finally {
			setUploading(false);
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	// ── Save profile ──────────────────────────────────────────────────────
	const handleSave = async () => {
		setSaving(true);
		setError('');
		try {
			const { data } = await api.post('/member/update', form);
			const updated = data.data ?? data;
			updateUser(updated);
			setSaved(true);
			setEditing(false);
			setTimeout(() => setSaved(false), 2500);
		} catch {
			setError('Failed to save changes.');
		} finally {
			setSaving(false);
		}
	};

	if (!user) {
		return (
			<div className="mp-not-logged">
				<User size={40} strokeWidth={1.5} />
				<p>Please log in to view your profile.</p>
			</div>
		);
	}

	return (
		<div className="mp-page">
			{error && (
				<div
					style={{
						background: '#fff5f5',
						border: '1.5px solid #fecaca',
						borderRadius: 10,
						padding: '10px 14px',
						fontSize: 12,
						color: '#ef4444',
						fontWeight: 500,
					}}
				>
					{error}
				</div>
			)}

			{/* ── Profile card ── */}
			<div className="mp-profile-card">
				<Avatar src={preview} nick={form.memberNick} onFileChange={handleImageChange} uploading={uploading} />
				<div className="mp-profile-info">
					<div className="mp-profile-info__top">
						<div>
							<h2 className="mp-profile-name">{user.memberNick}</h2>
							<span className={`mp-status-badge mp-status-badge--${user.memberStatus?.toLowerCase() ?? 'active'}`}>
								{user.memberStatus ?? 'Active'}
							</span>
						</div>
						<div className="mp-profile-meta">
							{user.memberType && <span className="mp-type-badge">{user.memberType}</span>}
							{(user.memberPoints ?? 0) > 0 && (
								<span className="mp-points">
									<Star size={12} strokeWidth={2.5} />
									{user.memberPoints} pts
								</span>
							)}
						</div>
					</div>
					{user.memberDesc && <p className="mp-profile-desc">{user.memberDesc}</p>}
				</div>
			</div>

			{/* ── Stats ── */}
			<div className="mp-stats">
				<StatCard icon={<Clock size={16} strokeWidth={2} />} label="Paused" value={pausedCount} color="#f59e0b" />
				<StatCard icon={<Loader size={16} strokeWidth={2} />} label="Process" value={processCount} color="#3b82f6" />
				<StatCard
					icon={<CheckCircle size={16} strokeWidth={2} />}
					label="Finished"
					value={finishedCount}
					color="#10b981"
				/>
				<StatCard
					icon={<ShoppingBag size={16} strokeWidth={2} />}
					label="Total"
					value={orders.length}
					color="#ff6b35"
				/>
			</div>

			{/* ── Edit form ── */}
			<div className="mp-form-card">
				<div className="mp-form-card__header">
					<h3 className="mp-form-card__title">Profile Information</h3>
					{!editing && (
						<button className="mp-edit-btn" onClick={() => setEditing(true)}>
							<Edit3 size={13} strokeWidth={2.5} />
							Edit
						</button>
					)}
				</div>

				<div className="mp-form-grid">
					<Field
						icon={<User size={13} strokeWidth={2} />}
						label="Nickname"
						name="memberNick"
						value={form.memberNick}
						placeholder="Your nickname"
						onChange={handleChange}
						disabled={!editing}
					/>
					<Field
						icon={<Phone size={13} strokeWidth={2} />}
						label="Phone"
						name="memberPhone"
						value={form.memberPhone}
						placeholder="+82 10 0000 0000"
						onChange={handleChange}
						disabled={!editing}
					/>
					<Field
						icon={<Mail size={13} strokeWidth={2} />}
						label="Email"
						name="memberEmail"
						value={form.memberEmail}
						placeholder="example@email.com"
						onChange={handleChange}
						disabled={!editing}
					/>
					<Field
						icon={<MapPin size={13} strokeWidth={2} />}
						label="Address"
						name="memberAddress"
						value={form.memberAddress}
						placeholder="Your address"
						onChange={handleChange}
						disabled={!editing}
					/>
					<Field
						icon={<FileText size={13} strokeWidth={2} />}
						label="About me"
						name="memberDesc"
						value={form.memberDesc}
						placeholder="Tell something..."
						onChange={handleChange}
						disabled={!editing}
						textarea
					/>
				</div>

				{editing && (
					<div className="mp-form-actions">
						<button
							className="mp-cancel-btn"
							onClick={() => {
								setEditing(false);
								setError('');
							}}
						>
							Cancel
						</button>
						<button className="mp-save-btn" onClick={handleSave} disabled={saving}>
							{saving ? (
								<>
									<Loader size={14} strokeWidth={2.5} /> Saving...
								</>
							) : saved ? (
								<>
									<CheckCircle size={14} strokeWidth={2.5} /> Saved!
								</>
							) : (
								<>
									<Save size={14} strokeWidth={2.5} /> Save Changes
								</>
							)}
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default MyPage;
