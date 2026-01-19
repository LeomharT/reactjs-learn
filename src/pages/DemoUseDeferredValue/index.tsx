import { Card, Flex, Input } from 'antd';
import { memo, useDeferredValue, useState, type JSX } from 'react';

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
        <ShowList text={deferredValue} />
      </Flex>
    </Card>
  );
}

const ShowList = memo(function ({ text }: { text: string }) {
  // Log once. The actual slowdown is inside SlowItem.
  console.log('[ARTIFICIALLY SLOW] Rendering 250 <SlowItem />');

  const items: JSX.Element[] = [];
  for (let i = 0; i < 250; i++) {
    items.push(<SlowItem key={i} text={text} />);
  }
  return <ul className='items'>{items}</ul>;
});

function SlowItem({ text }) {
  const startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return <li className='item'>Text: {text}</li>;
}
