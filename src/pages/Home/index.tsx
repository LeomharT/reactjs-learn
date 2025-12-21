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
      selectedRegions: [],
      regionsSelectable: false,
      markers: [
        { name: 'Egypt', coords: [26.8206, 30.8025] },
        { coords: [56.1304, 106.3468], labelName: 'Hello Canada' },
        { coords: [48.379433, 31.16558] },
      ],
      labels: {
        markers: {
          render(marker: any) {
            return marker.name || marker.labelName || 'Not available';
          },
        },
      },
      visualizeData: {
        scale: ['#eeeeee', '#00ff00'],
        values: {
          EG: 29,
          US: 100,
          CA: 190,
          BR: 75,
          CN: 500,
        },
      },
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
