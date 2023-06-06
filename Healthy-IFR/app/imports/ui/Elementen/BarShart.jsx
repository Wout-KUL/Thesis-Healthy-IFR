import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
    scales: { 
        x: {
            max: 100,
            min: 0,
        },
    },

    indexAxis: 'y',
    elements: {
        bar: {
        borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            display: false,
        position: 'right',
        },
        title: {
            display: true,
            text: 'Scores',
        },
    },
};


export function Bars({labels, values}) {
    const data = {
        labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: values,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },

        ],
      };

  return <Bar options={options} data={data}/>;
}
