import { MantineProvider, MantineThemeProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './index.css';
import { router } from './router/router';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const root = createRoot(document.querySelector('#root') as HTMLDivElement);

root.render(
	<QueryClientProvider client={queryClient}>
		<MantineProvider withCssVariables withGlobalClasses withStaticClasses>
			<MantineThemeProvider>
				<Notifications />
				<RouterProvider router={router} />
			</MantineThemeProvider>
		</MantineProvider>
	</QueryClientProvider>
);
