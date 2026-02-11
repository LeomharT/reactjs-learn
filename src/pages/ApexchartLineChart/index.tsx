import { Button, Card, Divider, Space } from 'antd';
import Charts, { type ApexOptions } from 'apexcharts';
import { useEffect, useRef } from 'react';
import CustomRadio from '../../components/CustomRadio';
import classes from './style.module.css';

const theme = {
  textColor: '#cecdc9',
};
const formater = Intl.DateTimeFormat('zh-CN', {
  timeStyle: 'medium',
});
const XAXISRANGE = 6000;
const TICKINTERVAL = 1000;

function generateRandomDataSeries(length: number = 1) {
  const date = Math.floor(Date.now() / 1000) * 1000;

  const data: { x: number; y: number }[] = [];

  for (let i = 0; i < length; i++) {
    const x = date + i * TICKINTERVAL;
    const y = Math.floor(Math.random() * 10 + 1);
    data.push({
      x,
      y,
    });
  }
  return data;
}

const LABELS = [
  'Pitch',
  'Roll',
  'Yaw',
  'Height',
  'Pitch-filter',
  'Roll-filter',
  'Yaw-filter',
  'Acc-X',
  'Acc-Y',
  'Acc-Z',
];

export default function ApexchartLineChart() {
  const ref = useRef<HTMLDivElement>(null);

  const chartRef = useRef<Charts>(null);

  const dataSeries = useRef({
    ['Pitch']: { data: generateRandomDataSeries(10), show: false },
    ['Roll']: { data: generateRandomDataSeries(10), show: true },
    ['Yaw']: { data: generateRandomDataSeries(10), show: true },
    ['Height']: { data: generateRandomDataSeries(10), show: true },
    ['Pitch-filter']: { data: generateRandomDataSeries(10), show: true },
    ['Roll-filter']: { data: generateRandomDataSeries(10), show: true },
    ['Yaw-filter']: { data: generateRandomDataSeries(10), show: true },
    ['Acc-X']: { data: generateRandomDataSeries(10), show: true },
    ['Acc-Y']: { data: generateRandomDataSeries(10), show: true },
    ['Acc-Z']: { data: generateRandomDataSeries(10), show: true },
  });

  async function initialChart() {
    if (!ref.current) throw new Error('Element not found');
    ref.current.innerHTML = '';

    chartRef.current = new Charts(ref.current, {
      title: {
        text: 'Demo',
        style: {
          color: theme.textColor,
        },
      },
      chart: {
        type: 'line',
        width: 720,
        height: 380,
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000,
          },
        },
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        background: '#1f2937',
      },
      stroke: {
        curve: 'smooth',
      },
      yaxis: {
        labels: {
          style: {
            colors: [theme.textColor],
            fontSize: '14px',
          },
        },
        crosshairs: {
          show: true,
          position: 'back',
          stroke: {
            color: '#b6b6b6',
            width: 1,
            dashArray: 4,
          },
        },
        tooltip: {
          enabled: true,
        },
        max: 10,
        min: 0,
        stepSize: 2,
      },
      xaxis: {
        type: 'datetime',
        range: XAXISRANGE,
        labels: {
          style: {
            colors: theme.textColor,
            fontSize: '14px',
          },
          datetimeUTC: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: true,
          stroke: {
            color: '#b6b6b6',
            width: 1,
            dashArray: 4,
          },
        },
      },
      grid: {
        strokeDashArray: 4,
        borderColor: '#2e3847',
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      tooltip: {
        enabled: true,
        cssClass: classes.tooltip,
        shared: true,
        intersect: false,
        x: {
          formatter(val) {
            return formater.format(new Date(val));
          },
        },
      },
      legend: {
        show: false,
        labels: {
          colors: theme.textColor,
        },
      },
      series: updateDataSeries(),
    } as ApexOptions);

    await chartRef.current.render();
  }

  function updateDataSeries() {
    return Object.keys(dataSeries.current)
      .map((v) => {
        if (!dataSeries.current[v].show) return undefined;

        return {
          name: v,
          data: dataSeries.current[v].data,
        };
      })
      .filter(Boolean) as any[];
  }

  function recordDataSeries() {
    for (const key in dataSeries.current) {
      const { data } = dataSeries.current[key];

      for (let i = 0; i < data.length - 10; i++) {
        data[i].x = data[i].x - XAXISRANGE - TICKINTERVAL;
        data[i].y = 0;
      }

      const lastDate = data[data.length - 1].x;
      data.push({
        x: lastDate + TICKINTERVAL,
        y: Math.floor(Math.random() * 10 + 1),
      });
    }
  }

  useEffect(() => {
    initialChart();
  }, []);

  return (
    <Card
      styles={{
        body: {
          background: '#1f2937',
        },
      }}
    >
      <div className={classes.chart}>
        <Space>
          <Button
            onClick={() => {
              recordDataSeries();
              setInterval(() => {
                recordDataSeries();
              }, TICKINTERVAL);
              setInterval(() => {
                chartRef.current?.updateSeries(updateDataSeries());
              }, 1000);
            }}
            type='primary'
          >
            Begin Record
          </Button>
          <Button>Stop Record</Button>
        </Space>
        <Divider />
        <Space>
          <Space vertical>
            {LABELS.map((value) => (
              <CustomRadio
                key={value}
                label={value}
                checked={true}
                onChange={(val) => {
                  dataSeries.current[value].show = val;
                  chartRef.current?.updateSeries(updateDataSeries());
                }}
              />
            ))}
          </Space>
          <div ref={ref}></div>
        </Space>
      </div>
    </Card>
  );
}
