import { LoadingOutlined } from '@ant-design/icons';
import { Spin, type SpinProps } from 'antd';

export default function Loader(props: SpinProps) {
  return <Spin {...props} indicator={<LoadingOutlined />} />;
}
