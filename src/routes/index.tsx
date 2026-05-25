import { createBrowserRouter } from 'react-router-dom';

import MainLayout from '../layout/MainLayout';

import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import UsersPage from '../pages/UsersPage';
import MyPage from '../pages/MyPage';
import QAPage from '../pages/QAPage';
import OrdersPage from '../pages/OrdersPage';

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
				path: 'qa',
				element: <QAPage />,
			},
			{
				path: 'mypage',
				element: <MyPage />,
			},
		],
	},
]);
