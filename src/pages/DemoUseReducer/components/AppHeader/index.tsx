import { AppShell, Burger, Group } from '@mantine/core';
import { useContext } from 'react';
import { AppContext } from '../../context';

export default function AppHeader() {
	const context = useContext(AppContext);

	return (
		<AppShell.Header>
			<Group h='100%' px='md'>
				<Burger
					opened={!context.opened}
					onClick={() => {
						if (context.opened) {
							context.dispatch({ type: 'closeSider' });
						} else {
							context.dispatch({ type: 'openSider' });
						}
					}}
				/>
			</Group>
		</AppShell.Header>
	);
}
