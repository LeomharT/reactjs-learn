import { QuestionOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

export const items: MenuProps['items'] = [
  {
    key: 'Hooks',
    label: 'Hooks',
    icon: <QuestionOutlined style={{ transform: 'rotate(180deg)' }} />,
    children: [
      {
        key: 'hooks/useOptimistic',
        label: 'useOptimistic',
      },
    ],
  },
];
