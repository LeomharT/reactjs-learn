import { lazy } from 'react';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router';
import AppShell from '../app';
import NotFound from '../pages/NotFound';
import Test from '../pages/Test';

const Home = lazy(() => import('../pages/Home'));
const DemoUse = lazy(() => import('../pages/DemoUse'));
const DemoUseOptimistic = lazy(() => import('../pages/DemoUseOptimistic'));
const DemoUseTransition = lazy(() => import('../pages/DemoUseTransition'));
const DemoUseDeferredValue = lazy(() => import('../pages/DemoUseDeferredValue'));

const StreamPlayer = lazy(() => import('../pages/StreamPlayer'));
const AudioPlayer = lazy(() => import('../pages/AudioPlayer'));
const ApexchartLineChart = lazy(() => import('../pages/ApexchartLineChart'));

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
        <Route
          path='useDeferredValue'
          handle={{ label: 'useDeferredValue' }}
          element={<DemoUseDeferredValue />}
        />
      </Route>
      <Route path='examples' handle={{ label: 'example' }}>
        <Route index element={<Navigate to={'streamPlayer'} />} />
        <Route path='streamPlayer' handle={{ label: 'StreamPlayer' }} element={<StreamPlayer />} />
        <Route path='audioPlayer' handle={{ label: 'AudioPlayer' }} element={<AudioPlayer />} />
        <Route
          path='apexchartLineChart'
          handle={{ label: 'ApexchartLineChart' }}
          element={<ApexchartLineChart />}
        />
      </Route>
      <Route path='test' element={<Test />} />
      <Route path='*' handle={{ label: '404' }} element={<NotFound />} />
    </Route>,
  ),
);
