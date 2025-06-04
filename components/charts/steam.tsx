import React from 'react';
import {Box} from '../styles/box';
import Chart, {Props} from 'react-apexcharts';

const state: Props['series'] = [
   {
      name: 'Unemployment Rate',
      data: [22.8, 22.5, 22.9, 23.1, 23.3, 23.5, 23.7],
   },
   {
      name: 'Job Applications',
      data: [45000, 48000, 52000, 55000, 58000, 61000, 64000],
   },
];

const options: Props['options'] = {
   chart: {
      type: 'area',
      animations: {
         easing: 'linear',
         speed: 300,
      },
      sparkline: {
         enabled: false,
      },
      brush: {
         enabled: false,
      },
      id: 'basic-bar',
      fontFamily: 'Inter, sans-serif',
      foreColor: 'var(--nextui-colors-accents9)',
      stacked: false,
      toolbar: {
         show: false,
      },
   },
   colors: ['#FF4B4B', '#FF4B4B'],
   plotOptions: {
      area: {
         fill: {
            opacity: 0.5,
            colors: ['#FF4B4B', 'transparent']
         }
      }
   },
   stroke: {
      colors: ['#FF4B4B', 'transparent']
   },

   xaxis: {
      categories: ['2022', '2023 Q1', '2023 Q2', '2023 Q3', '2023 Q4', '2024 Q1', '2024 Q2'],
      labels: {
         style: {
            colors: 'var(--nextui-colors-accents8)',
            fontFamily: 'Inter, sans-serif',
         },
      },
      axisBorder: {
         color: 'var(--nextui-colors-border)',
      },
      axisTicks: {
         color: 'var(--nextui-colors-border)',
      },
   },
   yaxis: [
      {
         seriesName: 'Unemployment Rate',
         title: {
            text: 'Unemployment Rate (%)',
            style: {
               color: 'var(--nextui-colors-accents8)',
            }
         },
         labels: {
            style: {
               colors: 'var(--nextui-colors-accents8)',
               fontFamily: 'Inter, sans-serif',
            },
         },
         min: 20,
         max: 25,
      },
      {
         seriesName: 'Job Applications',
         opposite: true,
         title: {
            text: 'Job Applications (K)',
            style: {
               color: 'var(--nextui-colors-accents8)',
            }
         },
         labels: {
            style: {
               colors: 'var(--nextui-colors-accents8)',
               fontFamily: 'Inter, sans-serif',
            },
         },
         min: 40,
         max: 70,
      }
   ],
   tooltip: {
      enabled: true,
      y: {
         formatter: function (val, opts) {
            if (opts.seriesIndex === 0) {
               return val.toFixed(1) + '%';
            } else {
               return (val / 1000).toFixed(0) + 'K';
            }
         }
      }
   },
   grid: {
      show: true,
      borderColor: 'var(--nextui-colors-border)',
      strokeDashArray: 0,
      position: 'back',
   },
   stroke: {
      curve: 'smooth',
      width: 3,
   },
   colors: ['#FF4757', '#2F80ED'],
   markers: {
      size: 4,
      strokeWidth: 2,
   },
};

export const Steam = () => {
   return (
      <>
         <Box
            css={{
               width: '100%',
               zIndex: 5,
            }}
         >
            <div id="chart">
               <Chart
                  options={options}
                  series={state}
                  type="area"
                  height={425}
               />
            </div>
         </Box>
      </>
   );
};
