import { useContext } from 'react';
import { AppContext, type AppContextValue } from '../context';

export function useApp(): AppContextValue {
	const context = useContext(AppContext);

	return context;
}
