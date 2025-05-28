import { AppShell } from '@mantine/core';
import { useReducer } from 'react';
import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';
import AppSider from './components/AppSider';
import { AppContext } from './context';

export default function DemoUseReducer() {
	const [state, dispatch] = useReducer(
		(state, action) => {
			if (action.type === 'openSider') {
				state.opened = true;
			}
			if (action.type === 'closeSider') {
				state.opened = false;
			}
			console.log(state, action);
			return {
				...state,
			};
		},
		{
			opened: false,
		}
	);

	return (
		<AppContext.Provider
			value={{
				...state,
				dispatch,
			}}
		>
			<AppShell
				header={{ height: { base: 60, md: 70, lg: 80 } }}
				navbar={{
					width: { base: 200, md: 300, lg: 400 },
					breakpoint: 'sm',
					collapsed: {
						desktop: state.opened,
						mobile: !state.opened,
					},
				}}
				padding='md'
			>
				<AppHeader />
				<AppSider />
				<AppContent />
			</AppShell>
		</AppContext.Provider>
	);
}
