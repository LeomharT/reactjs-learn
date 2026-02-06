import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import './index.css';
import { router } from './router/router';

const root = createRoot(document.querySelector('#root') as HTMLDivElement);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
