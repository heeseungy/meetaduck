import Card from '@/components/commons/Card';
import Input from '@/components/commons/Input';
import ProfileName from '@/components/commons/ProfileName';
import ShareButton from '@/components/party/ShareButton';
import styles from '@/styles/party/PartyMaker.module.css';
import Button from '@/components/commons/Button';

function PartyMakerPage() {
  const children = (
    <div>
      <ProfileName />
    </div>
  );
  return (
    <div className={styles.margin}>
      <header>
        <span className={`FontL`}>블랙펄 마니또</span>
        <span className={styles.marginLeft}>
          <ShareButton>참여 코드 공유</ShareButton>
          <Card {...{ tag: 4, children: children }} />
          <div className={styles.endWrapper}>
            <div className={`FontM`}>종료 시간</div>
            <div className={`${styles.inputWrapper}`}>
              <Input />
            </div>
            <div className={`${styles.buttonWrapper}`}>
              <span className={`${styles.oneButton}`}>
                <Button bgc='filled'>시작하기</Button>
              </span>
              <span>
                <Button bgc='empty'>파티닫기</Button>
              </span>
            </div>
          </div>
        </span>
      </header>
    </div>
  );
}

export default PartyMakerPage;
