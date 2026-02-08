import { Button, Card, Divider, Space } from 'antd';
import Charts, { type ApexOptions } from 'apexcharts';
import { useEffect, useRef } from 'react';
import classes from './style.module.css';

const theme = {
  textColor: '#cecdc9',
};
const formater = Intl.DateTimeFormat('zh-CN', {
  timeStyle: 'medium',
});
const XAXISRANGE = 9000;
const TICKINTERVAL = 1000;

function generateRandomDataSeries(length: number = 1) {
  const date = Math.floor(Date.now() / 1000) * 1000;

  const data: { x: number; y: number }[] = [];

  for (let i = 0; i < length; i++) {
    const x = date + i * TICKINTERVAL;
    const y = Math.floor(Math.random() * 5 + 3);
    data.push({
      x,
      y,
    });
  }
  return data;
}

export default function ApexchartLineChart() {
  const ref = useRef<HTMLDivElement>(null);

  const chartRef = useRef<Charts>(null);

  const dataSeries = useRef({
    ['Pitch']: generateRandomDataSeries(10),
    ['Roll']: generateRandomDataSeries(10),
    ['Yaw']: generateRandomDataSeries(10),
    ['Height']: generateRandomDataSeries(10),
    ['Pitch-filter']: generateRandomDataSeries(10),
    ['Roll-filter']: generateRandomDataSeries(10),
    ['Yaw-filter']: generateRandomDataSeries(10),
    ['Acc-X']: generateRandomDataSeries(10),
    ['Acc-Y']: generateRandomDataSeries(10),
    ['Acc-Z']: generateRandomDataSeries(10),
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
        width: 1080,
        height: 550,
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
    return Object.keys(dataSeries.current).map((v) => {
      return {
        name: v,
        data: dataSeries.current[v],
      };
    });
  }

  function recordDataSeries() {
    for (const key in dataSeries.current) {
      for (let i = 0; i < dataSeries.current[key].length - 10; i++) {
        dataSeries.current[key][i].x = dataSeries.current[key][i].x - XAXISRANGE - TICKINTERVAL;
        dataSeries.current[key][i].y = 0;
      }

      const lastDate = dataSeries.current[key][dataSeries.current[key].length - 1].x;
      dataSeries.current[key].push({
        x: lastDate + TICKINTERVAL,
        y: Math.floor(Math.random() * 5 + 3),
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
      <div ref={ref}></div>
    </Card>
  );
}
