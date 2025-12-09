import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router';
import App from '../app';

const DemoUseOptimistic = lazy(() => import('../pages/DemoUseOptimistic'));
const DemoUseTransition = lazy(() => import('../pages/DemoUseTransition'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element='Hello World' />
      <Route path='hooks' loader={() => ({ label: 'Hooks' })}>
        <Route index element={<Navigate to='useOptimistic' />} />
        <Route
          path='useOptimistic'
          loader={() => ({ label: 'useOptimistic' })}
          element={<DemoUseOptimistic />}
        />
        <Route path='useTransition' element={<DemoUseTransition />} />
      </Route>
    </Route>
  )
);
