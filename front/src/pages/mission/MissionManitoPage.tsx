import plusCircle from '@/assets/images/PlusCircle.png';
import Button from '@/components/commons/Button';
import Card from '@/components/commons/Card';
import styles from '@/styles/mission/Mission.module.css';
import { ArrowsClockwise } from '@phosphor-icons/react';

type MissionManitoProps = {
  nickname: string;
};

function MissionManitoPage(props: MissionManitoProps) {
  const uploadHandler = () => {
    console.log('사진 업로드!');
  };

  const submitHandler = () => {
    console.log('제출 완료!');
  };

  const missionContent = '손으로 그린 그림을 선물하세요.';
  function newMission() {
    return;
  }
  const children = (
    <div className={`${styles.FlexVertical} ${styles.AlignBaseLine} ${styles.Gap45Rem}`}>
      <div className={`${styles.FlexVertical}`}>
        <div className={`${styles.Title} ${styles.FlexHorizontal} ${styles.Gap1Rem}`}>
          <div className={`FontL`}>오늘의 미션</div>
          <div className={`${styles.FlexHorizontal} ${styles.Gap05Rem}`}>
            <div className={`FontXS FontBasic`}>{}/3</div>
            <div className={`${styles.IconSpin}`} onClick={newMission}>
              <ArrowsClockwise size={20} />
            </div>
          </div>
        </div>
        <div>
          <div className={`FontS FontBasic ${styles.MissionStatus}`}>{props.nickname}님에게</div>
          <div className={`FontS FontBasic ${styles.MissionStatus}`}>{missionContent}</div>
        </div>
      </div>
      <div className={`${styles.FlexVertical} ${styles.AlignBaseLine} ${styles.Gap1Rem}`}>
        <div>
          <div className={`FontL ${styles.Title}`}>미션 업로드</div>
          <div className={`FontS FontComment ${styles.MissionStatus}`}>미션을 수행한 사진을 업로드해주세요.</div>
        </div>
        <div className={`${styles.FlexVertical} ${styles.AlignCenter} ${styles.Gap1Rem} ${styles.ImageBoxContainer}`}>
          <div onClick={uploadHandler}>
            <div className={`${styles.imageBox}`}>
              <img src={plusCircle} alt="plusCircle" />
            </div>
          </div>
          <div>
            <Button onClickHandler={submitHandler} bgc="filled">
              제출
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
  return <Card {...{ tag: 2, children: children }}></Card>;
}

export default MissionManitoPage;
