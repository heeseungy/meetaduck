import { useNavigate } from 'react-router-dom';

import RubberDuckBase1 from '@/assets/images/RubberDuckBase1.png';
import missionBefore1 from '@/assets/images/missionBefore1.png';
import voteAfter from '@/assets/images/voteAfter.png';
import Button from '@/components/commons/Button';
import ResultListItem from '@/components/result/ResultListItem';
import styles from '@/styles/vote/VoteAfterPage.module.css';
import { ResultListItemProps } from '@/types/result';

function VoteAfterPage() {
  const navigate = useNavigate();
  const returnChatting = () => {
    navigate('/chatting');
  };

  const examplePair: ResultListItemProps = {
    manito: {
      nickname: '마니또',
      thumbnailUrl: missionBefore1,
      guestId: 10235486123,
      profileUrl: '',
      manitiId: 10235486124,
      votedId: 102354861245,
      manitoFavorability: 100,
    },
    maniti: {
      nickname: '마니띠',
      thumbnailUrl: RubberDuckBase1,
      guestId: 10235486124,
      profileUrl: '',
      manitiId: 102354861244,
      votedId: 10235486123,
      manitoFavorability: 100,
    },
  };
  return (
    <div className={styles.Container}>
      <div className={styles.FlexVertical}>
        <img src={voteAfter} alt="voteAfter" />
        <div className="FontL">투표 완료!</div>
      </div>
      <div className={`${styles.FlexVertical} ${styles.Gap2rem}`}>
        <div className={`FontSBold ${styles.FlexVertical} ${styles.Gap02rem}`}>
          <p>마니또를 맞추면 모자로</p>
          <p>투표 결과를 확인할 수 있어요!</p>
        </div>
        <ResultListItem {...examplePair} />
      </div>
      <div className={`${styles.FlexVertical} ${styles.Gap1rem}`}>
        <div className="FontS">모든 참가자가 투표할 때까지 기다려주세요</div>
        <Button onClickHandler={returnChatting} bgc="voteFinish">
          그룹 채팅으로 돌아가기
        </Button>
      </div>
    </div>
  );
}

export default VoteAfterPage;
