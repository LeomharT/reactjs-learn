import { Card, Col, Flex, Grid, Row } from 'antd';
import jsVectorMap from 'jsvectormap';
import 'jsvectormap/dist/jsvectormap.min.css';
import 'jsvectormap/dist/maps/world.js';
import { useEffect, useRef, useState } from 'react';
import Charts from 'react-apexcharts';
import Loader from '../../components/Loader';
import { sleep } from '../../utils/sleep';
import classes from './style.module.css';
const { useBreakpoint } = Grid;

function randomData(): number[] {
  return Array.from({ length: 31 }, () => Math.round(Math.random() * 33 + 1));
}

export default function Home() {
  const map = useRef<typeof jsVectorMap>(null);

  const screens = useBreakpoint();

  const [isFetching, setIsFetching] = useState(false);

  const [chartData, setChartData] = useState([
    randomData(),
    randomData(),
    randomData(),
  ]);

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
          fill: '#73d13d',
        },
      },
      selectedRegions: [],
      regionsSelectable: false,
      regionsSelectableOne: false,
      markers: [
        { name: 'China', coords: [35.8, 104.1] },
        { name: 'Egypt', coords: [26.8, 30.8] },
        { name: 'Russia', coords: [56.1304, 106.3468] },
        { name: 'Ukraine', coords: [48.379433, 31.16558] },
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

    async function handleOnRegionClick(e: PointerEvent, code: string) {
      e.stopPropagation();

      const selectedRegions = map.current.getSelectedRegions();

      if (selectedRegions[0] === code) {
        map.current.setSelectedRegions([]);
      } else {
        setIsFetching(true);

        map.current.params.onRegionClick = null;
        map.current.setSelectedRegions([code]);

        await sleep(2000);

        setIsFetching(false);
        setChartData([randomData(), randomData(), randomData()]);
        map.current.params.onRegionClick = handleOnRegionClick;
      }
    }

    map.current.params.onRegionClick = handleOnRegionClick;

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
            <Loader size='large' spinning={isFetching}>
              <div id='chart' className={classes.chart}>
                <Charts
                  type='bar'
                  height='100%'
                  options={{
                    chart: {
                      type: 'bar',
                      stacked: true,
                      stackType: 'normal',
                      toolbar: {
                        show: false,
                      },
                      animations: {
                        enabled: true,
                      },
                    },
                    legend: {
                      show: false,
                    },
                    tooltip: {
                      enabled: true,
                    },
                    plotOptions: {
                      bar: {
                        horizontal: false,
                      },
                    },
                    dataLabels: {
                      enabled: false,
                    },
                    xaxis: {
                      type: 'datetime',
                      categories: Array.from(
                        { length: 31 },
                        (_, k) => `${k + 1}December`
                      ),
                    },
                    yaxis: {
                      max: 100,
                    },
                    colors: ['#1d39c4', '#0958d9', '#73d13d'],
                  }}
                  series={[
                    {
                      name: 'PRODUCT A',
                      data: chartData[0],
                    },
                    {
                      name: 'PRODUCT B',
                      data: chartData[1],
                    },
                    {
                      name: 'PRODUCT C',
                      data: chartData[2],
                    },
                  ]}
                />
              </div>
            </Loader>
          </Card>
        </Col>
      </Row>
    </Flex>
  );
}
