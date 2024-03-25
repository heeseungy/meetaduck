import { useNavigate } from 'react-router-dom';

import { partyState } from '@/recoil/atom';
import styles from '@/styles/chatting/ChattingHeader.module.css';
import { ArrowLeft } from '@phosphor-icons/react';
import { useRecoilValue } from 'recoil';

function ChattingHeader({ tag }: { tag: string }) {
  const navigate = useNavigate();
  const toBack = () => {
    navigate('/chatting');
  };

  if (tag === 'groupChat') {
    const party = useRecoilValue(partyState);
    return (
      <div className={styles.HeaderArea}>
        <div onClick={toBack} className={`FontSBold FontBasic ${styles.BackBtn}`}>
          <ArrowLeft size={20} weight="bold" />
        </div>
        <div className="FontSBold FontBasic">{party.partyName}의 그룹채팅방</div>
      </div>
    );
  } else if (tag === 'manitoChat') {
    return (
      <div className={styles.HeaderArea}>
        <div onClick={toBack} className={`FontSBold FontBasic ${styles.BackBtn}`}>
          <ArrowLeft size={20} weight="bold" />
        </div>
        <div className="FontSBold FontBasic">마니또랑 채팅</div>
      </div>
    );
  } else {
    return (
      <div className={styles.HeaderArea}>
        <div onClick={toBack} className={`FontSBold FontBasic ${styles.BackBtn}`}>
          <ArrowLeft size={20} weight="bold" />
        </div>
        <div className="FontSBold FontBasic">마니띠랑 채팅</div>
      </div>
    );
  }
}

export default ChattingHeader;
