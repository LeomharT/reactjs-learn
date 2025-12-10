import { VerticalAlignTopOutlined } from '@ant-design/icons';
import {
  Alert,
  Breadcrumb,
  FloatButton,
  Layout,
  type BreadcrumbProps,
} from 'antd';
import { useRef } from 'react';
import { Link, Outlet, useMatches } from 'react-router';
import classes from './style.module.css';

const { ErrorBoundary } = Alert;

export default function AppContent() {
  const ref = useRef<HTMLDivElement>(null);

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

  function backToTop() {
    ref.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <Layout.Content ref={ref} className={classes.content}>
      <ErrorBoundary>
        <Breadcrumb items={getItems()} />
        <br />
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
    </Layout.Content>
  );
}
