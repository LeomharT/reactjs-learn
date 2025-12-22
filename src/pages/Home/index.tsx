import { Card, Col, Flex, Grid, Row } from 'antd';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/jsvectormap.min.css';
import 'jsvectormap/dist/maps/world.js';
import { useEffect, useRef } from 'react';
import classes from './style.module.css';
const { useBreakpoint } = Grid;

export default function Home() {
  const map = useRef<typeof jsVectorMap>(null);

  const screens = useBreakpoint();

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
      regionStyle: {
        selected: {
          fill: '#c41d7f',
        },
      },
      selectedRegions: [],
      regionsSelectable: false,
      regionsSelectableOne: false,
      markers: [
        { name: 'Egypt', coords: [26.8, 30.8] },
        { name: 'Russia', coords: [56.1304, 106.3468] },
        { name: 'Ukraine', coords: [48.379433, 31.16558] },
        { name: 'China', coords: [35.8, 104.1] },
      ],
      lineStyle: {
        strokeDasharray: '6 3',
        animation: true,
        curvature: true,
      },
      lines: [],
      labels: {
        markers: {
          render(marker: typeof jsVectorMap) {
            return marker.name;
          },
        },
      },
      visualizeData: {
        scale: ['#bae0ff', '#0958d9'],
        values: {
          EG: 29,
          US: 100,
          CA: 190,
          BR: 75,
          CN: 150,
        },
      },
    });

    map.current.addLines([
      { from: 'Russia', to: 'China' },
      { from: 'Egypt', to: 'China' },
      { from: 'Ukraine', to: 'China' },
    ]);

    map.current.params.onRegionClick = (e: PointerEvent, code: string) => {
      e.stopPropagation();

      const selectedRegions = map.current.getSelectedRegions();

      if (selectedRegions[0] === code) {
        map.current.setSelectedRegions([]);
      } else {
        map.current.setSelectedRegions([code]);
      }
    };

    console.log(map.current);

    const observer = new ResizeObserver(() => {
      map.current.updateSize();
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
      map.current.params.onRegionClick = null;
    };
  }, []);

  return (
    <Flex vertical className={classes.root}>
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} order={screens.xl ? 2 : 1}>
          <Card classNames={{ body: classes.body }}>
            <Card.Meta title='Location' />
            <div id='map' className={classes.map}></div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} order={screens.xl ? 1 : 2}>
          <Card classNames={{ body: classes.body }}>
            <Card.Meta title='Summary' />
            <div id='chart' className={classes.chart}></div>
          </Card>
        </Col>
      </Row>
    </Flex>
  );
}
