import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router';
import App from '../app/App';
import DemoMenuManage from '../pages/DemoMenuManage';
import DemoUseOptimistic from '../pages/DemoUseOptimistic';
import DemoUseReducer from '../pages/DemoUseReducer';
import DemoUseTransition from '../pages/DemoUseTransition';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<App />}>
			<Route index element={<Navigate to='/useOptimistic' />} />
			<Route path='useOptimistic' element={<DemoUseOptimistic />} />
			<Route path='useTransition' element={<DemoUseTransition />} />
			<Route path='useReducer' element={<DemoUseReducer />} />
			<Route path='menuManage' element={<DemoMenuManage />} />
		</Route>
	)
);
