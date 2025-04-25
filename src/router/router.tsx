import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
} from 'react-router';
import DemoUseOptimistic from '../pages/DemoUseOptimistic';

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/'>
			<Route element={<Navigate to='/useOptimistic' />} />
			<Route element={<DemoUseOptimistic />} />
		</Route>
	)
);
