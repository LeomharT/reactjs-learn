import { QuestionOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

export const items: MenuProps['items'] = [
  {
    key: '/hooks',
    label: 'Hooks',
    icon: <QuestionOutlined style={{ transform: 'rotate(180deg)' }} />,
    children: [
      {
        key: '/hooks/useOptimistic',
        label: 'useOptimistic',
      },
      {
        key: '/hooks/useTransition',
        label: 'useTransition',
      },
    ],
  },
];
