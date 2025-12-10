import { App as AntApp, ConfigProvider, Layout, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { useEffect, useRef, useState } from 'react';
import AppContent from './AppContent';
import AppHeader from './AppHeader';
import AppSider from './AppSider';

export default function App() {
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
      locale={zhCN}
      theme={{
        cssVar: {},
        algorithm:
          colorScheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <AntApp>
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
      </AntApp>
    </ConfigProvider>
  );
}
