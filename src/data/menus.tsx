import { AppstoreAddOutlined, HomeOutlined, QuestionOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

export const items: MenuProps['items'] = [
  {
    key: '/home',
    label: 'Home',
    icon: <HomeOutlined />,
  },
  {
    key: '/hooks',
    label: 'Hooks',
    icon: <QuestionOutlined style={{ transform: 'rotate(180deg)' }} />,
    children: [
      {
        key: '/hooks/use',
        label: 'use',
      },
      {
        key: '/hooks/useOptimistic',
        label: 'useOptimistic',
      },
      {
        key: '/hooks/useTransition',
        label: 'useTransition',
      },
      {
        key: '/hooks/useDeferredValue',
        label: 'useDeferredValue',
      },
    ],
  },
  {
    key: '/examples',
    label: 'Example',
    icon: <AppstoreAddOutlined />,
    children: [
      { key: '/examples/streamPlayer', label: 'StreamPlayer' },
      { key: '/examples/audioPlayer', label: 'AudioPlayer' },
      { key: '/examples/apexchartLineChart', label: 'ApexchartLineChart' },
    ],
  },
];
