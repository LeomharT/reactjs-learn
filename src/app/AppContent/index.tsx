import { Alert, Breadcrumb, Layout, type BreadcrumbProps } from 'antd';
import { Link, Outlet, useMatches } from 'react-router';
import classes from './style.module.css';

const { ErrorBoundary } = Alert;

export default function AppContent() {
  const matches = useMatches();

  function getItems() {
    const items: BreadcrumbProps['items'] = [];

    matches.forEach((value, index) => {
      if (value.handle) {
        const label = (value.handle as { label: string }).label;

        items.push({
          title:
            index === matches.length - 1 ? (
              label
            ) : (
              <Link to={value.pathname}>{label}</Link>
            ),
        });
      }
    });

    return items;
  }

  return (
    <Layout.Content className={classes.content}>
      <ErrorBoundary>
        <Breadcrumb items={getItems()} />
        <br />
        <Outlet />
      </ErrorBoundary>
    </Layout.Content>
  );
}
