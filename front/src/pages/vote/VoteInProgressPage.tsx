import VoteCard from '@/components/vote/VoteCard';
import VoteCarouselList from '@/components/vote/VoteCarouselList';
import { PARTYLIST } from '@/recoil/dummy';
import styles from '@/styles/vote/VoteInProgressPage.module.css';
import { ListProfile } from '@/types/user.interface';

function VoteInProgressPage() {
  const partyList: ListProfile[] = PARTYLIST;
  return (
    <div className={`${styles.Container}`}>
      <div className={styles.Title}>
        <div className={`FontMTitle FontBasic ${styles.TitleItem}`}>지금은 투표시간이 아닙니다</div>
        <div className={`FontSBold FontRed  ${styles.TitleItem}`}>파티 종료 24시간 전부터 투표할 수 있어요!</div>
      </div>
      <div>
        <VoteCard />
      </div>
      <div className={styles.Carousel}>
        <VoteCarouselList {...{ partyList: partyList }} />
      </div>
    </div>
  );
}

export default VoteInProgressPage;
