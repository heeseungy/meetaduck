import Button from '@/components/commons/Button';
import Card from '@/components/commons/Card';
import Input from '@/components/commons/Input';
import ProfileName from '@/components/commons/ProfileName';
import ShareButton from '@/components/party/ShareButton';
import styles from '@/styles/party/PartyMaker.module.css';

function PartyMakerPage() {
  const tempJoinNumber = 0;

  const children = (
    <div className={styles.cardMargin}>
      <div className={`${styles.marginBottom} ${styles.spaceB}`}>
        <span className={`FontM`}>참여 현황</span>
        <span>{tempJoinNumber}명 창여중</span>
      </div>
      <ProfileName />
    </div>
  );
  return (
    <div className={styles.margin}>
      <header className={styles.spaceB}>
        <span className={`FontL`}>블랙펄 마니또</span>
        <span>
          <ShareButton>참여 코드 공유</ShareButton>
        </span>
      </header>
        <div className={styles.cardContainer}>
          <Card {...{ tag: 4, children: children }} />
        </div>
        <div className={styles.endWrapper}>
          <div className={`FontM`}>종료 시간</div>
          <div className={`${styles.inputWrapper}`}>
            <Input />
          </div>
          <div className={`${styles.buttonWrapper}`}>
            <span className={`${styles.oneButton}`}>
              <Button bgc="filled">시작하기</Button>
            </span>
            <span>
              <Button bgc="empty">파티닫기</Button>
            </span>
          </div>
        </div>

    </div>
  );
}

export default PartyMakerPage;
