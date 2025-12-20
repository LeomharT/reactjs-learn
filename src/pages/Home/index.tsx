import { Card, Flex } from 'antd';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/jsvectormap.min.css';
import 'jsvectormap/dist/maps/world.js';

import { useEffect, useRef } from 'react';
export default function Home() {
  const map = useRef<typeof jsVectorMap>(null);

  useEffect(() => {
    const el = document.querySelector('#map');
    if (el) el.innerHTML = '';

    map.current = new jsVectorMap({
      selector: '#map',
      map: 'world',
      toolbar: false,
      height: 500,
    });
  }, []);

  return (
    <Flex vertical>
      <Card>
        <div id='map'></div>
      </Card>
    </Flex>
  );
}
