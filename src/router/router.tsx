import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router';
import App from '../app';
import NotFound from '../pages/NotFound';

const DemoUseOptimistic = lazy(() => import('../pages/DemoUseOptimistic'));
const DemoUseTransition = lazy(() => import('../pages/DemoUseTransition'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element='Hello World' />
      <Route path='hooks' handle={{ label: 'hooks' }}>
        <Route index element={<Navigate to='useOptimistic' />} />
        <Route
          path='useOptimistic'
          handle={{ label: 'useOptimistic' }}
          element={<DemoUseOptimistic />}
        >
          <Route path='ok' element='ok' />
        </Route>
        <Route
          path='useTransition'
          handle={{ label: 'useTransition' }}
          element={<DemoUseTransition />}
        />
      </Route>
      <Route path='*' handle={{ label: '404' }} element={<NotFound />} />
    </Route>
  )
);
