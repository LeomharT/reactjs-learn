import { createContext, type ActionDispatch } from 'react';

export const actionTypes = ['toggle_sider'] as const;

export type Action = {
	type: (typeof actionTypes)[number];
	payload?: unknown;
};

export interface AppContextValue {
	opened: boolean;
	dispatch: ActionDispatch<[action: Action]>;
}

export const AppContext = createContext<AppContextValue>({} as AppContextValue);
