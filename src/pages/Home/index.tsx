import { Card, Flex } from 'antd';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/jsvectormap.min.css';
import 'jsvectormap/dist/maps/world.js';
import { useEffect, useRef } from 'react';
import classes from './style.module.css';

export default function Home() {
  const map = useRef<typeof jsVectorMap>(null);

  useEffect(() => {
    const el = document.querySelector('#map') as HTMLDivElement;
    el.innerHTML = '';

    map.current = new jsVectorMap({
      selector: '#map',
      map: 'world',
      zoomOnScroll: false,
      draggable: false,
      showTooltip: true,
      zoomButtons: false,
      regionStyle: {},
      selectedRegions: ['EG', 'US'],
      regionsSelectable: true,
      markers: [
        { name: 'Egypt', coords: [26.8206, 30.8025] },
        { coords: [56.1304, 106.3468], labelName: 'Hello Canada' },
        { coords: [48.379433, 31.16558] },
      ],
    });

    console.log(map.current);

    const observer = new ResizeObserver(() => {
      map.current.updateSize();
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Flex vertical>
      <Card>
        <div id='map' className={classes.map}></div>
      </Card>
    </Flex>
  );
}
