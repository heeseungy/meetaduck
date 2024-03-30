import styles from '@/styles/vote/VoteCarouselList.module.css';
import { ListProfile } from '@/types/user.interface';

import VoteCarouselListItem from './VoteCarouselListItem';

type VoteCarouselListProps = {
  partyList: ListProfile[];
};
function VoteCarouselList(voteCarouselListProps: VoteCarouselListProps) {
  console.log(voteCarouselListProps);
  const tempList1 = voteCarouselListProps.partyList.slice();
  const tempList2 = voteCarouselListProps.partyList.slice();
  // tempList1.sort((a, b) => a.guestId - b.guestId);
  // tempList2.sort((a, b) => a.guestId - b.guestId);
  const item1: ListProfile[] = tempList1.splice(0, 0);
  console.log(item1);
  const item2: ListProfile[] = tempList1.splice(0, 1);
  tempList1.splice(tempList1.length, 0, ...item1);
  console.log(tempList1);
  tempList2.splice(tempList1.length, 0, ...item2);

  const voteCarouselListProps1: VoteCarouselListProps = {
    partyList: tempList1,
  };
  const voteCarouselListProps2: VoteCarouselListProps = {
    partyList: tempList2,
  };

  return (
    <div className={styles.CarouselContainer}>
      <div>
        <VoteCarouselListItem {...voteCarouselListProps} />
      </div>
      {/* <div className={styles.Carouselsecond}>
        <VoteCarouselListItem {...voteCarouselListProps1} />
      </div> */}
      <div className={styles.Carouselthird}>
        <VoteCarouselListItem {...voteCarouselListProps2} />
      </div>
    </div>
  );
}

export default VoteCarouselList;
