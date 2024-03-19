import Card from '@/components/commons/Card';
import styles from '@/styles/chatting/ChattingPage.module.css';

function ChattingPage() {
  const children = (
    <div className={styles.cardMargin}>
      I am Card Contents
    </div>
  );
  return (
    <>
      <h1 className={`FontBasic FontL ${styles.heading}`}>채팅</h1>
      <div className={styles.cardContainer}>
        <Card {...{ tag: 2, children: children }} />
      </div>
    </>
  );
}

export default ChattingPage;
