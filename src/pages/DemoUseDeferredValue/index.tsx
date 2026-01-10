import { Card, Flex, Input } from 'antd';
import { Suspense, useDeferredValue, useState } from 'react';

export default function DemoUseDeferredValue() {
  const [search, setSearch] = useState('');

  const deferredValue = useDeferredValue(search);

  return (
    <Card>
      <Flex vertical gap={16}>
        <Input
          size='large'
          placeholder='Please Enter Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Suspense fallback={<h2>Loading...</h2>}>{deferredValue}</Suspense>
      </Flex>
    </Card>
  );
}
