import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Button, Layout, Space, theme, Typography } from 'antd';
import classes from './style.module.css';

type AppHeaderProps = {
  colorScheme: 'light' | 'dark';
  onToggleTheme: () => void;
};

export default function AppHeader(props: AppHeaderProps) {
  const { token } = theme.useToken();

  const iconType = props.colorScheme === 'light';

  return (
    <Layout.Header
      className={classes.header}
      style={{ background: token.colorBgContainer }}
    >
      <Space size='large'>
        <img className={classes.icon} src='/react.svg' />
        <Typography.Title level={3}>ReactJS Learn</Typography.Title>
      </Space>
      <Space>
        <Button
          type='text'
          size='large'
          icon={iconType ? <MoonOutlined /> : <SunOutlined />}
          onClick={props.onToggleTheme}
        />
      </Space>
    </Layout.Header>
  );
}
