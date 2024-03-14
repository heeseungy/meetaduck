import Card from '@/components/commons/Card';
import ResultPieChart from '@/components/result/ResultPieChart';
import ResultWord from '@/components/result/ResultWord';

function A2402() {
  const children = (
    <div>
      <div>마니또 {}님과 관계분석</div>
      <div>
        <img src="" alt="" />
        <div>우호도 {}점</div>
      </div>
      <div>
        <div>
          <ResultWord />
          <ResultWord />
        </div>
        <div>
          <div>
            <div>대화 빈도/횟수</div>
            <div>{}회</div>
          </div>
          <div>
            <div>미션 수행 횟수</div>
            <div>{}회</div>
          </div>
          <div>
            <div>
              <span>긍정어</span>vs<span>부정어</span> 사용비율
              <ResultPieChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Card {...{ tag: 2, children: children }} />
    </>
  );
}

export default A2402;
