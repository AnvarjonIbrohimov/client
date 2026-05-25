import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import App from './App';
import { OrderProvider } from './context/Ordercontext';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<OrderProvider>
				<App />
			</OrderProvider>
		</QueryClientProvider>
	</StrictMode>,
);
