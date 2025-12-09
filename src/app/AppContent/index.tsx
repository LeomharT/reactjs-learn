import { Alert, Layout } from 'antd';
import { Outlet } from 'react-router';
import classes from './style.module.css';

const { ErrorBoundary } = Alert;

export default function AppContent() {
  return (
    <Layout.Content className={classes.content}>
      <ErrorBoundary>
        <Outlet />
      </ErrorBoundary>
    </Layout.Content>
  );
}
