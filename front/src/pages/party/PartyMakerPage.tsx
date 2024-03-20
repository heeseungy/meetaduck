import Button from '@/components/commons/Button';
import Card from '@/components/commons/Card';
import ProfileName from '@/components/commons/ProfileName';
import DatePickerInput from '@/components/party/DatePickerInput';
import ShareButton from '@/components/party/ShareButton';
import { partyDeleteervice } from '@/services/partyDeleteService';
import { partyStartService } from '@/services/partyStartService';
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

  const startHandler = () => {
    console.log('시작하기');
    partyStartService();
  };

  const deleteHandler = () => {
    console.log('파티닫기');
    partyDeleteervice();
  };
  return (
    <div className={styles.margin}>
      <header className={styles.spaceB}>
        <span className={`FontL FontBasic`}>블랙펄 마니또</span>
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
          <DatePickerInput />
        </div>
        <div className={`${styles.buttonWrapper}`}>
          <span className={`${styles.oneButton}`}>
            <Button onClickHandler={startHandler} bgc="filled">
              시작하기
            </Button>
          </span>
          <span>
            <Button onClickHandler={deleteHandler} bgc="empty">
              파티닫기
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PartyMakerPage;
