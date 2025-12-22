import { VerticalAlignTopOutlined } from '@ant-design/icons';
import {
  Alert,
  Breadcrumb,
  FloatButton,
  Layout,
  Skeleton,
  Typography,
  type BreadcrumbProps,
} from 'antd';
import { Suspense, useRef } from 'react';
import { Link, Outlet, useLocation, useMatches } from 'react-router';
import classes from './style.module.css';

const { ErrorBoundary } = Alert;

export default function AppContent() {
  const ref = useRef<HTMLDivElement>(null);

  const matches = useMatches();

  const location = useLocation();

  function getItems() {
    const items: BreadcrumbProps['items'] = [];

    console.log(matches);

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

  function backToTop() {
    ref.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <Layout.Content ref={ref} className={classes.content}>
      <Suspense key={location.pathname} fallback={<Fallback />}>
        <ErrorBoundary>
          <Breadcrumb items={getItems()} />
          <Typography.Title
            level={3}
            hidden={!matches[matches.length - 1]?.handle}
          >
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
        </ErrorBoundary>
      </Suspense>
    </Layout.Content>
  );
}

function Fallback() {
  return <Skeleton active />;
}
