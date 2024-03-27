import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import rubberDuckBase from '@/assets/images/RubberDuckBase.png';
import missionBefore from '@/assets/images/missionBefore.png';
import Button from '@/components/commons/Button';
import Card from '@/components/commons/Card';
import { chatIdListState, loginState } from '@/recoil/atom';
import { MY_MANITO_MISSION } from '@/recoil/dummy';
import { manitoMissionLoad } from '@/services/missionTodayService';
import styles from '@/styles/mission/Mission.module.css';
import { MissionResult } from '@/types/mission';
import { useRecoilValue } from 'recoil';

type MissionManitiProps = {
  nickname: string;
};

function MissionManitiPage(props: MissionManitiProps) {
  const login = useRecoilValue(loginState);
  const chatIdList = useRecoilValue(chatIdListState);
  const navigate = useNavigate();

  // 마니또 미션
  const [myManitoMission, setMyManitoMission] = useState<MissionResult>(MY_MANITO_MISSION);

  // 마니또 미션 로드
  useEffect(() => {
    manitoMissionLoad(login.guestId).then((data) => {
      setMyManitoMission(data);
      ////////////////////////////////////////
      // 미션 받아오는 데이터가 없어!!????????????
      ///////////////////////////////////////////
    });
  }, []);

  // 마니또의 미션 성공/실패/확인 여부
  // true: 성공 false: 실패 null: 값 없음
  const [isConfirmed, setIsConfirmed] = useState<true | false | null>(null);

  // 마니또 미션이 변경되면
  // 미션 확인 여부 수정
  useEffect(() => {
    setIsConfirmed(myManitoMission.successTime !== null ? true : myManitoMission.failedTime !== null ? false : null);
  }, [myManitoMission]);

  useEffect(() => {
    console.log(myManitoMission, isConfirmed);
  }, [isConfirmed]);
  const confirmYesHandler = () => {
    // 마니또 성공확인
    setIsConfirmed(true);
    // axios

    console.log('확인 완료!');
  };
  const confirmNoHandler = () => {
    setIsConfirmed(false);
    // axios
    console.log('확인 완료!');
  };

  const returnChatting = () => {
    navigate(`/chatdetail/${chatIdList.manitoChatId}`);
  };
  const children = (
    <div>
      <div className={`FontL ${styles.Title}`}>오늘의 미션</div>
      {myManitoMission.missionImageUrl !== null ? (
        // 이미지 URL 존재 여부
        <div>
          <div className={`${styles.marginTop}`}>
            <div className={`FontS FontBasic ${styles.MissionStatus}`}>
              <div>{props.nickname}님에게</div>
              <div>마니또의 선물이 도착했어요!</div>
            </div>
          </div>
          <div className={`${styles.container} ${styles.marginTop}`}>
            {/* <img className={`${styles.PreviewImage}`} src={myManitoMission.missionImageUrl} alt="img" /> */}
            <div className={`${styles.imageBox}`}>
              <img src={rubberDuckBase} alt="rubberDuckBase" />
            </div>

            {isConfirmed !== null ? (
              // 체크를 했다면
              <>
                <div className={`${styles.marginTop}`}>
                  {isConfirmed ? (
                    // 성공인지
                    <div>
                      <div className={`FontS`}>마니또에게 감사인사를</div>
                      <div className={`FontS`}>전하러 가볼까요?</div>
                    </div>
                  ) : (
                    // 실패인지
                    <div>
                      <div className={`FontS`}>마니또와 이야기해봐요😥</div>
                    </div>
                  )}
                  <div className={`${styles.marginTop}`}></div>
                  <div className={`${styles.marginTop}`}></div>
                  <Button onClickHandler={returnChatting} bgc="voteFilled">
                    채팅방으로 이동
                  </Button>
                </div>
              </>
            ) : (
              // 확인을 아직 안했으면
              <>
                <div className={`${styles.marginTop}`}>
                  <div className={`FontS FontBasic ${styles.marginBottom}`}>선물을 잘 받으셨나요?</div>
                  <span>
                    <Button onClickHandler={confirmYesHandler} bgc="filled">
                      네
                    </Button>
                  </span>
                  <span className={`${styles.buttonMargin}`}></span>
                  <span>
                    <Button onClickHandler={confirmNoHandler} bgc="empty">
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
