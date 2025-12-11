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
import data from './data.json';

type ListType = {
  id: string;
  title: string;
  description: string;
};

type OptimisticListType = ListType & {
  loading?: boolean;
};

export default function DemoUseOptimistic() {
  const [form] = useForm();

  const [list, setList] = useState<ListType[]>(data);

  const [optimisticList, setOptimisticList] =
    useOptimistic<OptimisticListType[]>(list);

  async function updateList(data: { input: string }) {
    form.resetFields();

    const description = randomDescription();

    const optimisticItem = {
      id: crypto.randomUUID(),
      title: data.input,
      loading: true,
      description,
    };

    startTransition(() => {
      setOptimisticList((list) => [...list, optimisticItem]);
    });

    startTransition(async () => {
      const newItem = await createItem(data.input);
      newItem.description = description;

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
        {optimisticList.map((item) => (
          <Col key={item.id} span={24}>
            <div>
              <Loader spinning={!!item?.loading}>
                <Space size='middle'>
                  <Avatar
                    size={48}
                    shape='square'
                    src={`https://skillicons.dev/icons?i=${item.title}&theme=light`}
                  />
                  <Space vertical size={0}>
                    <a href='#'>{item.title}</a>
                    <Typography.Text type='secondary'>
                      {item.description}
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
  return await wait(
    { id: crypto.randomUUID(), title: input, description: '' },
    1000
  );
}

function wait<T>(value: T, duration: number) {
  return new Promise<T>((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, duration);
  });
}

const descriptions = [
  '那是一种内在的东西， 他们到达不了，也无法触及的',
  '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  '生命就像一盒巧克力，结果往往出人意料',
  '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  '那时候我只会想自己想要什么，从不想自己拥有什么',
];

function randomDescription() {
  const index = Math.round(Math.random() * (descriptions.length - 1));
  return descriptions[index];
}
