import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from '../src/layout/MainLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import UsersPage from './pages/UsersPage';
import OrdersPage from './pages/OrdersPage';
import MyPage from './pages/MyPage';
import HelpPage from './pages/Help';
import { AuthProvider } from './context/AuthContext';
// ... boshqa sahifalar

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<Route path="/" element={<HomePage />} />
						<Route path="/products" element={<ProductsPage />} />
						<Route path="/users" element={<UsersPage />} />
						<Route path="/orders" element={<OrdersPage />} />
						<Route path="/help" element={<HelpPage />} />
						<Route path="/mypage" element={<MyPage />} />
					</Route>
				</Routes>
				</BrowserRouter>
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;
