import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import UsersPage from './pages/UsersPage';
import OrdersPage from './pages/OrdersPage';
import MyPage from './pages/MyPage';
import HelpPage from './pages/Help';
import ProtectedRoute from './routes/ProtectedRoute';
import Login from './pages/LoginPage';
import Signup from './pages/SignupPage';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import ProductDetail from './pages/Productdetail';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<OrderProvider>
					<BrowserRouter>
						<Routes>
							<Route element={<Layout />}>
								{/* PUBLIC ROUTES */}
								<Route path="/" element={<HomePage />} />
								<Route path="/products" element={<ProductsPage />} />
								<Route path="/users" element={<UsersPage />} />
								<Route path="/help" element={<HelpPage />} />

								<Route path="/product/:id" element={<ProductDetail />} />

								{/* AUTH ROUTES */}
								<Route path="/login" element={<Login />} />
								<Route path="/signup" element={<Signup />} />

								{/* PROTECTED ROUTES */}
								<Route
									path="/orders"
									element={
										<ProtectedRoute>
											<OrdersPage />
										</ProtectedRoute>
									}
								/>

								<Route
									path="/mypage"
									element={
										<ProtectedRoute>
											<MyPage />
										</ProtectedRoute>
									}
								/>
							</Route>
						</Routes>
					</BrowserRouter>
				</OrderProvider>
			</AuthProvider>
		</QueryClientProvider>
	);
}

export default App;
