import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ dates, navs }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current && dates && navs && dates.length === navs.length) {
      if (chartInstance.current) {
        chartInstance.current.data.labels = dates;
        chartInstance.current.data.datasets[0].data = navs;
        chartInstance.current.update();
      } else {
        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [{
              label: 'NAV',
              data: navs,
              borderColor: 'rgb(75, 192, 192)',
              fill: false,
            }]
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'NAV'
                }
              }
            }
          }
        });
      }
    }
  }, [dates, navs]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default LineChart;
