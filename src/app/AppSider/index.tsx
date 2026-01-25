import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme, type MenuProps } from 'antd';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { items } from '../../data/menus.tsx';
import classes from './style.module.css';
export default function AppSider() {
  const location = useLocation();

  const navigate = useNavigate();

  const [selectedKeys] = useState<string[]>([location.pathname]);

  const [openedKeys] = useState<string[]>(setDefaultOpenedKeys(location.pathname));

  const { token } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  const handleOnMenuChange: MenuProps['onSelect'] = (info) => {
    navigate(`${info.key}`);
  };

  return (
    <Layout.Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={256}
      className={classes.content}
      style={{ background: token.colorBgContainer }}
    >
      <Menu
        mode='inline'
        classNames={{ root: classes.root }}
        defaultOpenKeys={openedKeys}
        defaultSelectedKeys={selectedKeys}
        items={items}
        onSelect={handleOnMenuChange}
      />
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

function setDefaultOpenedKeys(path: string): string[] {
  const keys = path.split('/').filter(Boolean);
  const opened: string[] = [];

  keys.reduce((prev, curr) => {
    opened.push(prev);
    return prev + '/' + curr;
  }, '');

  return opened;
}
