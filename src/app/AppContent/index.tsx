import { Alert, Breadcrumb, Layout, type BreadcrumbProps } from 'antd';
import { Outlet, useMatches } from 'react-router';
import classes from './style.module.css';

const { ErrorBoundary } = Alert;

export default function AppContent() {
  const matches = useMatches();

  function getItems() {
    const items: BreadcrumbProps['items'] = [];

    matches.forEach((value, index) => {
      if (value.loaderData) {
        const label = (value.loaderData as any).label;

        items.push({
          title:
            index === matches.length - 1 ? (
              label
            ) : (
              <a href={value.pathname}>{label}</a>
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
