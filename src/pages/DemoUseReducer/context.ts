import { createContext, type ActionDispatch } from 'react';

export interface AppContextValue {
	opened: boolean;
	dispatch: ActionDispatch<[action: unknown]>;
}

export const AppContext = createContext<AppContextValue>({} as AppContextValue);
