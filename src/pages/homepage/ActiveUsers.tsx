import { useQuery } from '@tanstack/react-query';
import { api, BASE_URL } from '../../libs/config';
import { Star } from 'lucide-react';
import '../../css/home/ActiveUsers.css';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Member {
	_id: string;
	memberNick: string;
	memberImage?: string;
	memberPoints?: number;
	memberType?: string;
}

// ─── API ──────────────────────────────────────────────────────────────────────
const fetchTopUsers = async (): Promise<Member[]> => {
	const { data } = await api.get('/member/top-users');
	return Array.isArray(data) ? data : (data.data ?? []);
};

// ─── UserCard ─────────────────────────────────────────────────────────────────
function UserCard({ member }: { member: Member }) {
	const imageUrl = member.memberImage ? `${BASE_URL}${member.memberImage}` : null;

	const initials = member.memberNick.slice(0, 2).toUpperCase();

	return (
		<div className="au-card">
			<div className="au-card__img-wrap">
				{imageUrl ? (
					<img src={imageUrl} alt={member.memberNick} className="au-card__img" />
				) : (
					<div className="au-card__initials">{initials}</div>
				)}
			</div>
			<div className="au-card__info">
				<p className="au-card__name">{member.memberNick}</p>
				{(member.memberPoints ?? 0) > 0 && (
					<p className="au-card__points">
						<Star size={11} strokeWidth={0} fill="#f59e0b" />
						{member.memberPoints} pts
					</p>
				)}
			</div>
		</div>
	);
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function UserCardSkeleton() {
	return (
		<div className="au-card au-card--skeleton">
			<div className="au-skeleton__img" />
			<div className="au-card__info">
				<div className="au-skeleton__line au-skeleton__line--med" />
				<div className="au-skeleton__line au-skeleton__line--short" />
			</div>
		</div>
	);
}

// ─── ActiveUsers ──────────────────────────────────────────────────────────────
function ActiveUsers() {
	const {
		data: users,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['top-users'],
		queryFn: fetchTopUsers,
	});

	return (
		<section className="au-section">
			<div className="au-section__header">
				<div>
					<h2 className="au-section__title">Active Users</h2>
					<p className="au-section__sub">Top members of our community</p>
				</div>
				{users && users.length > 0 && <span className="au-section__count">{users.length} members</span>}
			</div>

			<div className="au-grid">
				{isLoading && Array.from({ length: 5 }).map((_, i) => <UserCardSkeleton key={i} />)}
				{isError && <div className="au-error">Failed to load users.</div>}
				{!isLoading && !isError && users?.map((u) => <UserCard key={u._id} member={u} />)}
				{!isLoading && !isError && users?.length === 0 && <div className="au-empty">No active users found.</div>}
			</div>
		</section>
	);
}

export default ActiveUsers;
