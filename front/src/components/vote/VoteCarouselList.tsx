import { useEffect, useState } from 'react';

import { partyState } from '@/recoil/atom';
import { partyListAll } from '@/services/voteService';
import styles from '@/styles/vote/VoteCarouselList.module.css';
import { ListProfile } from '@/types/user.interface';
import { useRecoilValue } from 'recoil';

import VoteCarouselListItem from './VoteCarouselListItem';

function VoteCarouselList() {
  const party = useRecoilValue(partyState);
  const [partyList, setPartyList] = useState<ListProfile[]>([]);
  const [voteCarouselListProps1, setVoteCarouselListProps1] = useState<ListProfile[]>([]);
  const [voteCarouselListProps2, setVoteCarouselListProps2] = useState<ListProfile[]>([]);
  useEffect(() => {
    partyListAll(party.partyId).then((data) => {
      setPartyList(data);
    });
  }, []);
  useEffect(() => {
    let tempList1 = partyList.slice();
    const item1 = tempList1.pop();
    tempList1.unshift(item1!);
    let tempList2 = tempList1.slice();
    const item2 = tempList2.pop();
    tempList2.unshift(item2!);
    setVoteCarouselListProps1(tempList1);
    setVoteCarouselListProps2(tempList2);
  }, [partyList]);
  return (
    <div className={styles.CarouselContainer}>
      <div>
        <VoteCarouselListItem {...{ partyList: partyList }} />
      </div>
      <div className={styles.Carouselsecond}>
        <VoteCarouselListItem {...{ partyList: voteCarouselListProps1 }} />
      </div>
      <div className={styles.Carouselthird}>
        <VoteCarouselListItem {...{ partyList: voteCarouselListProps2 }} />
      </div>
    </div>
  );
}

export default VoteCarouselList;
