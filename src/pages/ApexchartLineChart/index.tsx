import { Card } from 'antd';
import Charts, { type ApexOptions } from 'apexcharts';
import { useEffect, useRef } from 'react';
import classes from './style.module.css';

const theme = {
  textColor: '#cecdc9',
};

function generateRandomDataSeries(length: number = 1) {
  const data: number[] = [];
  for (let i = 0; i < length; i++) {
    const number = Math.floor(Math.random() * 5 + 3);
    data.push(number);
  }
  return data;
}

export default function ApexchartLineChart() {
  const ref = useRef<HTMLDivElement>(null);

  const chartRef = useRef<Charts>(null);

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
          dynamicAnimation: {
            speed: 1000,
          },
        },
        toolbar: {
          show: false,
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
        type: 'category',
        tickAmount: 10,
        labels: {
          style: {
            colors: theme.textColor,
            fontSize: '14px',
          },
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
      },
      legend: {
        labels: {
          colors: theme.textColor,
        },
      },
      series: [
        {
          name: 'Pitch',
          data: generateRandomDataSeries(100),
        },
        {
          name: 'Roll',
          data: generateRandomDataSeries(100),
        },
        {
          name: 'Yaw',
          data: generateRandomDataSeries(100),
        },
        {
          name: 'Height',
          data: generateRandomDataSeries(100),
        },
        {
          name: 'Pitch-filter',
          data: generateRandomDataSeries(100),
        },
        {
          name: 'Roll-filter',
          data: generateRandomDataSeries(100),
        },
        {
          name: 'Yaw-filter',
          data: generateRandomDataSeries(100),
        },
        {
          name: 'Acc-X',
          data: generateRandomDataSeries(100),
        },
        {
          name: 'Acc-Y',
          data: generateRandomDataSeries(100),
        },
        {
          name: 'Acc-Z',
          data: generateRandomDataSeries(100),
        },
      ],
    } as ApexOptions);

    await chartRef.current.render();
    console.log(chartRef.current);
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
      <div ref={ref}></div>
    </Card>
  );
}
