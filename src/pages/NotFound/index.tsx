import { Card, Result } from 'antd';

export default function NotFount() {
  return (
    <Card>
      <Result status='404' title='404'></Result>;
    </Card>
  );
}
