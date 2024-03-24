import { useEffect, useState } from 'react';

import rubberDuckBase from '@/assets/images/RubberDuckBase.png';
import missionBefore from '@/assets/images/missionBefore.png';
import Button from '@/components/commons/Button';
import Card from '@/components/commons/Card';
import { MY_MANITO_MISSION } from '@/recoil/dummy';
import styles from '@/styles/mission/Mission.module.css';
import { MissionResult } from '@/types/mission';

type MissionManitiProps = {
  nickname: string;
};

function MissionManitiPage(props: MissionManitiProps) {
  const [myManitoMission, setMyManitoMission] = useState<MissionResult>(MY_MANITO_MISSION);
  useEffect(() => {
    // axios 요청
    // setMyManitoMission();
  }, []);

  const [isConfirmed, setIsConfirmed] = useState(myManitoMission.successTime != null);
  // const [isSuccessed, setIsSuccessed] = useState(myManitoMission.successTime != null)
  const confirmHandler = () => {
    // 마니또 성공확인
    setIsConfirmed(true);
    console.log('확인 완료!');
  };

  const children = (
    <div>
      <div className={`FontL ${styles.Title}`}>오늘의 미션</div>
      {myManitoMission.missionImageUrl != null ? (
        <div>
          <div className={`${styles.marginTop}`}>
            <div className={`FontS FontBasic ${styles.MissionStatus}`}>
              <div>{props.nickname}님에게</div>
              <div>마니또의 선물이 도착했어요!</div>
            </div>
          </div>
          <div className={`${styles.container} ${styles.marginTop}`}>
            <div className={`${styles.imageBox}`}>
              <img src={rubberDuckBase} alt="rubberDuckBase" />
            </div>

            {isConfirmed ? (
              <>
                <div className={`${styles.marginTop}`}>
                  <div className={`FontS`}>마니또에게 감사인사를</div>
                  <div className={`FontS`}>전하러 가볼까요?</div>
                  <div className={`${styles.marginTop}`}></div>
                  <div className={`${styles.marginTop}`}></div>
                  <Button onClickHandler={confirmHandler} bgc="voteFilled">
                    채팅방으로 이동
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className={`${styles.marginTop}`}>
                  <div className={`FontS FontBasic ${styles.marginBottom}`}>선물을 잘 받으셨나요?</div>
                  <span>
                    <Button onClickHandler={confirmHandler} bgc="filled">
                      네
                    </Button>
                  </span>
                  <span className={`${styles.buttonMargin}`}></span>
                  <span>
                    <Button onClickHandler={confirmHandler} bgc="empty">
                      아니요
                    </Button>
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className={`FontS FontBasic ${styles.marginTop} ${styles.MissionStatus}`}>
            마니또의 선물을 기다리고 있어요
          </div>
          <div className={`${styles.container}`}>
            <img src={missionBefore} alt="missionBefore" />
            <div className={`FontS FontBasic ${styles.marginTop}`}>기다리는 중...</div>
          </div>
        </div>
      )}
    </div>
  );
  return <Card {...{ tag: 2, children: children }}></Card>;
}

export default MissionManitiPage;
