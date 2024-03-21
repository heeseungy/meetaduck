import Card from '@/components/commons/Card';
import Slides from '@/components/commons/Slides';


function MissionCompletePage(MissionCompletePageProps) {
  const children = (
    <div>
      <div>
        <p>
          진행기간 <span>7</span>일 중
        </p>
        <p>
          총 <span>3</span>개의 미션을 수행했어요!
        </p>
      </div>
      <div>
        <div>내가 수행한 미션</div>
        <div></div>
      </div>
      <div>
        <div>
          <div>2/26</div>
          <div>00님에게 손으로 그린 그림을 선물하세요</div>
        </div>
        <div>
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
  return (
    <Slides className={'Slides'}>
      <Card {...{ tag: 1, children: children }} />
      <Card {...{ tag: 1, children: children }} />
    </Slides>
  );
}

export default MissionCompletePage;
