import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';

import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import UsersPage from '../pages/UsersPage';
import MyPage from '../pages/MyPage';
import OrdersPage from '../pages/OrdersPage';
import HelpPage from '../pages/Help';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,

		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				path: 'products',
				element: <ProductsPage />,
			},
			{
				path: 'users',
				element: <UsersPage />,
			},
			{
				path: 'orders',
				element: <OrdersPage />,
			},
			{
				path: 'help',
				element: <HelpPage />,
			},
			{
				path: 'mypage',
				element: <MyPage />,
			},
		],
	},
]);
