import '../../css/home/ActiveUsers.css';

function ActiveUsers() {
	const users = [
		{ id: 1, name: 'Ali', image: '/images/banner1.jpg' },
		{ id: 2, name: 'Sara', image: '/images/banner2.jpg' },
		{ id: 3, name: 'John', image: '/images/banner4.jpg' },
		{ id: 4, name: 'Emma', image: '/images/banner5.jpg' },
		{ id: 5, name: 'David', image: '/images/banner3.jpg' },
	];

	return (
		<div className="active-users">
			<h2 className="title">Active Users</h2>

			<div className="users-grid">
				{users.map((u) => (
					<div key={u.id} className="user-card">
						<img src={u.image} alt={u.name} />
						<p>{u.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default ActiveUsers;
