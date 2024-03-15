import voteAfter from '@/assets/images/voteAfter.png';
import Button from '@/components/commons/Button';
import ResultPair from '@/components/result/ResultListItem';

function A1403() {
  return (
    <div>
      <div>
        <img src={voteAfter} alt="voteAfter" />
        <div className="FontL">투표 완료!</div>
      </div>
      <div>
        <div>
          <p>마니또를 맞추면 모자로</p>
          <p>투표 결과를 확인할 수 있어요!</p>
        </div>
        <ResultPair />
      </div>
      <div>
        <div>모든 참가자가 투표할 때까지 기다려주세요</div>
        <Button bgc="filled">그룹 채팅으로 돌아가기</Button>
      </div>
    </div>
  );
}

export default A1403;
