import Card from '@/components/commons/Card';
import ResultPair from '@/components/result/ResultPair';

function A2401() {
  const children = (
    <div>
      <div>나의 마니또는 {}입니다</div>
      <div>
        <div>마니또 발표</div>
        <div>
          <div>마니또</div>
          <div>마니띠</div>
        </div>
        <div>
          <ResultPair />
        </div>
      </div>
    </div>
  );
  return (
    <>
      <img src="" alt="" />
      <Card {...{ tag: 2, children: children }} />
    </>
  );
}

export default A2401;
