import { AppShell, Skeleton } from '@mantine/core';

export default function AppSider() {
	return (
		<AppShell.Navbar p='md'>
			Navbar
			{Array(15)
				.fill(0)
				.map((_, index) => (
					<Skeleton key={index} h={28} mt='sm' animate={true} />
				))}
		</AppShell.Navbar>
	);
}
