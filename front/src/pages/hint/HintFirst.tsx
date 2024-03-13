import HintChats from '@/components/hint/HintChats';
import { Answer } from '@/types/hint.ts';

function HintFirst() {
  const hintList: Answer[] = [
    {
      hintId: 3,
      hintContent: '최근에 본 가장 인상 깊은 영화는 무엇인가요?',
      hintStatusAnswer: '윙카',
    },
    { hintId: 25, hintContent: '강아지 vs 고양이?', hintStatusAnswer: '고양이' },
  ];

  return (
    <div>
      {hintList.map((hint) => (
        <HintChats key={hint.hintId} {...hint} />
      ))}
    </div>
  );
}

export default HintFirst;
