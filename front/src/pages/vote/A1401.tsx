import VoteCard from '@/components/vote/VoteCard';
import VoteCarouselProfile from '@/components/vote/VoteCarouselProfile';
import styles from '@/styles/vote/VotePage.module.css';

function A1401() {
  return (
    <div className={`${styles.Container}`}>
      <div className={styles.Title}>
        <div className={`FontMTitle ${styles.TitleItem}`}>지금은 투표시간이 아닙니다</div>
        <div className={`FontSBold FontRed  ${styles.TitleItem}`}>파티 종료 24시간 전부터 투표할 수 있어요!</div>
      </div>
      <VoteCard />
      <VoteCarouselProfile />
    </div>
  );
}

export default A1401;
