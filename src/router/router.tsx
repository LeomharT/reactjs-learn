import { lazy } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router';
import AppShell from '../app';
import NotFound from '../pages/NotFound';

const Home = lazy(() => import('../pages/Home'));
const DemoUse = lazy(() => import('../pages/DemoUse'));
const DemoUseOptimistic = lazy(() => import('../pages/DemoUseOptimistic'));
const DemoUseTransition = lazy(() => import('../pages/DemoUseTransition'));
const StreamPlayer = lazy(() => import('../pages/StreamPlayer'));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<AppShell />}>
      <Route index element={<Navigate to={'home'} />} />
      <Route path='home' element={<Home />} />
      <Route path='hooks' handle={{ label: 'hooks' }}>
        <Route index element={<Navigate to='use' />} />
        <Route path='use' handle={{ label: 'use' }} element={<DemoUse />} />
        <Route
          path='useOptimistic'
          handle={{ label: 'useOptimistic' }}
          element={<DemoUseOptimistic />}
        />
        <Route
          path='useTransition'
          handle={{ label: 'useTransition' }}
          element={<DemoUseTransition />}
        />
      </Route>
      <Route path='examples' handle={{ label: 'example' }}>
        <Route index element={<Navigate to={'streamPlayer'} />} />
        <Route
          path='streamPlayer'
          handle={{ label: 'StreamPlayer' }}
          element={<StreamPlayer />}
        />
      </Route>
      <Route path='*' handle={{ label: '404' }} element={<NotFound />} />
    </Route>
  )
);
