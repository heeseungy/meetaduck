import VoteCard from '@/components/vote/VoteCard';
import VoteCarouselProfile from '@/components/vote/VoteCarouselProfile';

function A1401() {
  return (
    <div>
      <div>
        <div>지금은 투표시간이 아닙니다</div>
        <div>파티 종료 24시간 전부터 투표할 수 있어요!</div>
      </div>
      <VoteCard />
      <VoteCarouselProfile />
    </div>
  );
}

export default A1401;
