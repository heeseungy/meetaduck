import { WordType } from '@/types/result';
import { scaleLog } from '@visx/scale';
import { Text } from '@visx/text';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';

interface WordData {
  text: string;
  value: number;
}

interface ExampleProps {
  width: number;
  height: number;
  data: WordType[];
}
export default function Example({ width = 100, height = 100, data }: ExampleProps) {
  const words = data.map((it) => ({ text: it.word, value: it.count }));
  const colors = ['#4d4637', '#a2a2a2'];

  function getRotationDegree() {
    const rand = Math.random();
    const degree = rand > 0.2 ? 0 : 90;
    return degree;
  }

  const fontScale = scaleLog({
    domain: [Math.min(...words.map((w) => w.value)), Math.max(...words.map((w) => w.value))],
    range: [7, 20],
  });
  const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

  const fixedValueGenerator = () => 0.5;

  return (
    <div className="wordcloud">
      <Wordcloud
        words={words}
        width={width}
        height={height}
        fontSize={fontSizeSetter}
        font={'Pretendard'}
        padding={0}
        spiral={'rectangular'}
        rotate={getRotationDegree}
        random={fixedValueGenerator}
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            <Text
              key={i}
              fill={colors[i % colors.length]}
              textAnchor={'middle'}
              transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily={w.font}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>
    </div>
  );
}
