import { useRef } from 'react';
import { Chart } from 'react-chartjs-2';

import { WordCloudController, WordElement } from 'chartjs-chart-wordcloud';

// Strange default import issues otherwise
import data from './data.json';

const RectChartJs = require('react-chartjs-2'); // Strange default import issues otherwise

export function MyComponent() {
  const chartRef = useRef(null);
  if (!chartRef.current) {
    Chart.register(WordCloudController, WordElement);
  }
  return <RectChartJs.default width="500" height="500" type="wordCloud" ref={chartRef} data={data} options={{}} />;
}
export default MyComponent;
