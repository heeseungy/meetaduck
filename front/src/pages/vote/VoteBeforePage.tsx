import VoteCard from '@/components/vote/VoteCard';
import VoteCarouselList from '@/components/vote/VoteCarouselList';
import { PARTYLIST } from '@/recoil/dummy';
import styles from '@/styles/vote/VotePage.module.css';
import { ListProifle } from '@/types/user.interface';

function VoteBeforePage() {
  const partyList: ListProifle[] = PARTYLIST;
  return (
    <div className={`${styles.Container}`}>
      <div className={styles.Title}>
        <div className={`FontMTitle FontBasic ${styles.TitleItem}`}>지금은 투표시간이 아닙니다</div>
        <div className={`FontSBold FontRed  ${styles.TitleItem}`}>파티 종료 24시간 전부터 투표할 수 있어요!</div>
      </div>
      <VoteCard />
      <VoteCarouselList {...{ partyList: partyList }} />
    </div>
  );
}

export default VoteBeforePage;
