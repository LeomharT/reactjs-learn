import { ActionIcon, AppShell, Burger, Group, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useApp } from '../../hooks/useApp';

export default function AppHeader() {
	const { opened, dispatch } = useApp();

	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<AppShell.Header>
			<Group h='100%' px='md' justify='space-between'>
				<Burger
					opened={!opened}
					onClick={() => {
						dispatch({ type: 'toggle_sider' });
					}}
				/>
				<ActionIcon variant='default' size='xl' onClick={toggleColorScheme}>
					{colorScheme === 'dark' ? <IconSun /> : <IconMoon />}
				</ActionIcon>
			</Group>
		</AppShell.Header>
	);
}
