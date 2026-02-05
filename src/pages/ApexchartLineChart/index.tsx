import { Card } from 'antd';
import Charts, { type ApexOptions } from 'apexcharts';
import { useEffect, useRef } from 'react';

const theme = {
  textColor: '#cecdc9',
};

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
      },
      xaxis: {
        labels: {
          style: {
            colors: theme.textColor,
            fontSize: '14px',
          },
        },
        axisBorder: {
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
        followCursor: false,
      },
      legend: {
        labels: {
          colors: theme.textColor,
        },
      },
      series: [
        {
          data: [1, 3, 4, 5, 6, 7, 6, 1, 2],
        },
        {
          data: [3, 2, 6, 5, 7, 1, 2, 4, 2],
        },
      ],
    } as ApexOptions);

    await chartRef.current.render();
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
