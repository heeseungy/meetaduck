import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/commons/Button';
import Card from '@/components/commons/Card';
import VoteRadioButtonList from '@/components/vote/VoteRadioButtonList';
import { PARTYLIST } from '@/recoil/dummy';
import { votePersonService } from '@/services/voteService';
import styles from '@/styles/vote/VoteBefore24Page.module.css';
import { ResultListItemProps, ResultListProps } from '@/types/result';
import { ListProfile, PairRank } from '@/types/user.interface';

function VoteBefore24Page({
  guestId,
  myProfile,
  setMyProfile,
}: {
  guestId: number;
  myProfile: ListProfile;
  setMyProfile: React.Dispatch<React.SetStateAction<ListProfile>>;
}) {
  const navigate = useNavigate();
  const [partyList, setPartyList] = useState<ListProfile[]>(PARTYLIST);
  const [selectedValue, setSelectedValue] = useState(0);

  // 라디오 버튼을 누르면 selectedValue값이 바뀜
  function voteRadioButtonListHandler(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(parseInt(event.target.value));
    setSelectedValue(parseInt(event.target.value));
  }

  const voteFinish = () => {
    if (selectedValue === 0) {
      window.alert('투표를 해주세요');
    } else {
      votePersonService(guestId, selectedValue);
      setMyProfile((prevMyProfileState) => ({
        ...prevMyProfileState,
        votedId: selectedValue,
      }));
      // navigate('/voteFinish');
      // 조회 한번 하고 다시 렌더링 or 한번은 그냥 voteFinish로 가기
    }
  };

  const children = (
    <div className={styles.Container}>
      <div className={`FontL FontBasic ${styles.Title}`}>내 마니또는 누구?</div>
      <div className={styles.ScrollConatiner}>
        {<VoteRadioButtonList partyList={partyList} onChange={voteRadioButtonListHandler} value={selectedValue} />}
      </div>
      <Button onClickHandler={voteFinish} bgc={`${selectedValue ? 'voteFilled' : 'voteEmptyGray'}`}>
        투표하기
      </Button>
    </div>
  );
  return (
    <div>
      <Card {...{ tag: 2, children: children }} />
    </div>
  );
}

export default VoteBefore24Page;
