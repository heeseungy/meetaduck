import { useNavigate } from 'react-router-dom';

import styles from '@/styles/chatting/ChattingHeader.module.css';

function ChattingHeader({ tag }: { tag: string }) {
  const navigate = useNavigate();
  const toBack = () => {
    navigate('/chatting');
  };
  if (tag === 'groupChat') {
    return (
      <div className={styles.HeaderArea}>
        <div onClick={toBack} className={`FontSBold FontBasic ${styles.BackBtn}`}>{`<`}</div>
        <div className="FontSBold FontBasic">SSAFY 10기 1반의 그룹채팅방</div>
      </div>
    );
  } else if (tag === 'manitoChat') {
    return (
      <div className={styles.HeaderArea}>
        <div onClick={toBack} className={`FontSBold FontBasic ${styles.BackBtn}`}>{`<`}</div>
        <div className="FontSBold FontBasic">마니또랑 채팅</div>
      </div>
    );
  } else {
    return (
      <div className={styles.HeaderArea}>
        <div onClick={toBack} className={`FontSBold FontBasic ${styles.BackBtn}`}>{`<`}</div>
        <div className="FontSBold FontBasic">마니띠랑 채팅</div>
      </div>
    );
  }
}

export default ChattingHeader;
