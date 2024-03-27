import { Chart } from 'react-chartjs-2';

import { config, data } from '@/components/result/resultWordData';
import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
  registerables,
} from 'chart.js';
import { WordCloudChart, WordCloudController, WordElement } from 'chartjs-chart-wordcloud';

ChartJS.register(
  WordCloudController,
  WordElement,
  Legend,
  Tooltip,
  Filler,
  LineElement,
  PointElement,
  RadialLinearScale,
  ...registerables,
);

function ResultWordCloudChart() {
  return (
    <Chart
      type="wordCloud"
      data={data}
      width={300}
      height={300}
      option={{
        responsive: false,
        maintainAspectRatio: false,
        aspectRatio: 1,
        plugins: {
          title: {
            display: false,
            text: '',
            font: {
              size: 25,
              style: 'normal',
            },
          },
          legend: {
            labels: {
              font: {
                size: 15,
                style: 'normal',
              },
              color: 'black',
            },
            position: 'top',
          },
        },
        elements: {
          line: {
            borderWidth: 3,
          },
        },
      }}
    />
  );
}

export default ResultWordCloudChart;
