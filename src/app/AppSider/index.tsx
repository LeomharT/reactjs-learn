import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme, type MenuProps } from 'antd';
import { useState } from 'react';
import { useLocation, useMatches, useNavigate } from 'react-router';
import { items } from '../../data/menus.tsx';
import classes from './style.module.css';
export default function AppSider() {
  const locatoin = useLocation();

  const matches = useMatches();

  const navigate = useNavigate();

  const { token } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  const handleOnMenuChange: MenuProps['onSelect'] = (info) => {
    console.log(info);
    navigate(`/${info.key}`);
  };

  console.log(locatoin, matches);

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={256}
      className={classes.content}
      style={{ background: token.colorBgContainer }}
    >
      <Menu mode='inline' items={items} onSelect={handleOnMenuChange} />
      <Button
        shape='circle'
        size='small'
        icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
        className={classes.button}
        onClick={() => setCollapsed((prev) => !prev)}
      />
    </Layout.Sider>
  );
}
