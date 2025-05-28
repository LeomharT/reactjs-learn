import { MantineProvider } from '@mantine/core';
import { Outlet } from 'react-router';

export default function App() {
	return (
		<MantineProvider>
			<Outlet />
		</MantineProvider>
	);
}
