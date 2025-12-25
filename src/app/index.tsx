import { App, ConfigProvider, Layout, theme } from 'antd';
import enUS from 'antd/locale/en_US';
import { useEffect, useRef, useState } from 'react';
import AppContent from './AppContent';
import AppHeader from './AppHeader';
import AppSider from './AppSider';

export default function AppShell() {
  const ref = useRef(document.querySelector(':root'));

  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');

  function handleOnToggleTheme() {
    setColorScheme((prev) => {
      if (prev === 'dark') return 'light';
      return 'dark';
    });
  }

  useEffect(() => {
    ref.current?.setAttribute('color-scheme', colorScheme);
  }, [colorScheme]);

  return (
    <ConfigProvider
      locale={enUS}
      theme={{
        cssVar: {},
        algorithm:
          colorScheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <App>
        <Layout>
          <AppHeader
            colorScheme={colorScheme}
            onToggleTheme={handleOnToggleTheme}
          />
          <Layout hasSider>
            <AppSider />
            <AppContent />
          </Layout>
        </Layout>
      </App>
    </ConfigProvider>
  );
}
