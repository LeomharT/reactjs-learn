import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { startTransition, useOptimistic, useState } from 'react';
import Loader from '../../components/Loader';

type ListType = {
  id: string;
  title: string;
};

type OptimisticListType = ListType & {
  loading?: boolean;
};

export default function DemoUseOptimistic() {
  const [form] = useForm();

  const [list, setList] = useState<ListType[]>([
    {
      id: crypto.randomUUID(),
      title: 'Ant Design Title 1',
    },
    {
      id: crypto.randomUUID(),
      title: 'Ant Design Title 2',
    },
    {
      id: crypto.randomUUID(),
      title: 'Ant Design Title 3',
    },
    {
      id: crypto.randomUUID(),
      title: 'Ant Design Title 4',
    },
  ]);

  const [optimisticList, setOptimisticList] =
    useOptimistic<OptimisticListType[]>(list);

  async function updateList(data: { input: string }) {
    form.resetFields();

    const optimisticItem = {
      id: crypto.randomUUID(),
      title: data.input,
      loading: true,
    };

    startTransition(() => {
      setOptimisticList((list) => [...list, optimisticItem]);
    });

    startTransition(async () => {
      const newItem = await createItem(data.input);
      setList((list) => [...list, newItem]);
    });
  }

  return (
    <Card>
      <Space>
        <Form form={form} layout='inline' onFinish={updateList}>
          <Form.Item name='input' rules={[{ required: true }]}>
            <Input placeholder='Insert Title Here' />
          </Form.Item>
          <Button type='primary' htmlType='submit'>
            Add
          </Button>
        </Form>
      </Space>
      <Divider />
      <Row>
        {optimisticList.map((item, index) => (
          <Col key={item.id} span={24}>
            <div>
              <Loader spinning={!!item?.loading}>
                <Space size='middle'>
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                  <Space vertical size={0}>
                    <a href='#'>{item.title}</a>
                    <Typography.Text type='secondary'>
                      Ant Design, a design language for background applications,
                      is refined by Ant UED Team
                    </Typography.Text>
                  </Space>
                </Space>
              </Loader>
            </div>
            <Divider size='middle' />
          </Col>
        ))}
      </Row>
    </Card>
  );
}

async function createItem(input: string) {
  return await wait({ id: crypto.randomUUID(), title: input }, 1000);
}

function wait<T>(value: T, duration: number) {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, duration);
  });
}
