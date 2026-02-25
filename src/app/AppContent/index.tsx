import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { Breadcrumb, FloatButton, Layout, Skeleton, Typography, type BreadcrumbProps } from 'antd';
import { Suspense, useRef } from 'react';
import { Link, Outlet, useLocation, useMatches } from 'react-router';
import { AppErrorBoundary } from '../AppErrorboundary';
import classes from './style.module.css';

export default function AppContent() {
  const ref = useRef<HTMLDivElement>(null);

  const a: number = 123;

  const matches = useMatches();

  const location = useLocation();

  function getItems() {
    const items: BreadcrumbProps['items'] = [];

    matches.forEach((value, index) => {
      if (value.handle) {
        const label = (value.handle as { label: string }).label;

        items.push({
          title: index === matches.length - 1 ? label : <Link to={value.pathname}>{label}</Link>,
        });
      }
    });

    return items;
  }

  function backToTop() {
    ref.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <Layout.Content ref={ref} className={classes.content}>
      <AppErrorBoundary>
        <Suspense key={location.pathname} fallback={<Fallback />}>
          <Breadcrumb items={getItems()} />
          <Typography.Title level={3} hidden={!matches[matches.length - 1]?.handle}>
            {(matches[matches.length - 1]?.handle as { label?: string })?.label}
          </Typography.Title>
          <Outlet />
          <FloatButton
            tooltip={{
              title: 'Back To Top',
            }}
            shape='circle'
            icon={<VerticalAlignTopOutlined />}
            onClick={backToTop}
          />
        </Suspense>
      </AppErrorBoundary>
    </Layout.Content>
  );
}

function Fallback() {
  return <Skeleton active />;
}
