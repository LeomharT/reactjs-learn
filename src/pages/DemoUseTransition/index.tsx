import { Card, Input } from 'antd';
import { useState, useTransition } from 'react';
import Loader from '../../components/Loader';

export default function DemoUseTransition() {
  const LIST_COUNT = 2000;

  const [input, setInput] = useState('');

  const [loading, startTransition] = useTransition();

  const [list, setList] = useState<string[]>([]);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);

    startTransition(() => {
      const li: string[] = [];

      for (let i = 0; i <= LIST_COUNT; i++) {
        li.push(e.target.value);
      }

      setList(li);
    });
  }

  return (
    <Card>
      <Input
        allowClear
        size='large'
        value={input}
        onChange={handleOnChange}
        placeholder='Insert Value Here'
      />
      {loading ? <Loader /> : list.map((item, index) => <div key={index}>{item}</div>)}
    </Card>
  );
}
