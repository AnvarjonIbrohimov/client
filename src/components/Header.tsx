import { Link } from 'react-router-dom';

function Header() {
	return (
		<header className="bg-black text-white">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
				<h1 className="text-2xl font-bold">Smart Shop</h1>

				<nav className="flex gap-6">
					<Link to="/">Home</Link>

					<Link to="/products">Products</Link>

					<Link to="/users">Users</Link>

					<Link to="/orders">Orders</Link>

					<Link to="/qa">Q&A</Link>

					<Link to="/mypage">My Page</Link>
				</nav>
			</div>
		</header>
	);
}

export default Header;
