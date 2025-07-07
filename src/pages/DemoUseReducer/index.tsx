import { AppShell, MantineProvider, MantineThemeProvider } from '@mantine/core';
import { useReducer } from 'react';
import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';
import AppSider from './components/AppSider';
import { AppContext, type Action, type AppContextValue } from './context';

type ContextState = Omit<AppContextValue, 'dispatch'>;

export default function DemoUseReducer() {
	const [state, dispatch] = useReducer<ContextState, [action: Action]>(
		(state, action) => {
			console.log(state, action);

			if (action.type === 'toggle_sider') {
				state.opened = !state.opened;
			}

			return {
				...state,
			};
		},
		{
			opened: false,
		}
	);

	return (
		<AppContext
			value={{
				...state,
				dispatch,
			}}
		>
			<MantineProvider withCssVariables withGlobalClasses withStaticClasses>
				<MantineThemeProvider>
					<AppShell
						header={{ height: { base: 64 } }}
						navbar={{
							width: { base: 200, md: 300, lg: 400 },
							breakpoint: 'sm',
							collapsed: {
								desktop: state.opened,
								mobile: state.opened,
							},
						}}
						padding='md'
					>
						<AppHeader />
						<AppSider />
						<AppContent />
					</AppShell>
				</MantineThemeProvider>
			</MantineProvider>
		</AppContext>
	);
}
