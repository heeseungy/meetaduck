import { Doughnut } from 'react-chartjs-2';

import { ResultDoughnutChartProps } from '@/types/result';
import { ArcElement, Chart as ChartJS, Legend } from 'chart.js';

// 라이브러리 등록
ChartJS.register(ArcElement, Legend);

function ResultDoughnutChart(resultDoughnutChartProps: ResultDoughnutChartProps) {
  const data = {
    labels: ['긍정어', '부정어'],
    datasets: [
      {
        label: 'Dataset1',
        data: [resultDoughnutChartProps.ratio, 100 - resultDoughnutChartProps.ratio],
        backgroundColor: ['#4fc775', '#ff5952'],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
  };
  return <Doughnut options={options} data={data} width={100} height={100} />;
}

export default ResultDoughnutChart;
