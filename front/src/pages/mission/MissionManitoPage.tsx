import { useEffect, useState } from 'react';

import plusCircle from '@/assets/images/PlusCircle.png';
import Button from '@/components/commons/Button';
import Card from '@/components/commons/Card';
import { MISSION_STATUS_LIST } from '@/recoil/dummy';
import styles from '@/styles/mission/Mission.module.css';
import { MissionContent } from '@/types/mission';
import { ArrowsClockwise } from '@phosphor-icons/react';

type MissionManitoProps = {
  nickname: string;
};

function MissionManitoPage(props: MissionManitoProps) {
  // useEffect로 값 바꾸기 전에 임의의 값을 dummy의 값으로 지정하자 -> dummy.ts를 추후에 수정
  const [missionList, setMissionList] = useState<MissionContent[]>(MISSION_STATUS_LIST);
  const [nextMissionList, setNextMissionList] = useState<MissionContent[]>(
    missionList.filter((it) => it.confirmTime === null),
  );
  const [todayMission, setTodayMission] = useState<MissionContent>(
    missionList
      .filter((it) => it.confirmTime != null)
      .sort(
        (a: MissionContent, b: MissionContent) =>
          new Date(b.confirmTime!).getTime() - new Date(a.confirmTime!).getTime(),
      )[0],
  );

  useEffect(() => {
    // axios 미션 조회
    // const response =
    // setMissionList(response.data)
  }, []);

  useEffect(() => {
    setTodayMission(
      missionList
        .filter((it) => it.confirmTime != null)
        .sort(
          (a: MissionContent, b: MissionContent) =>
            new Date(b.confirmTime!).getTime() - new Date(a.confirmTime!).getTime(),
        )[0],
    );
    setNextMissionList(missionList.filter((it) => it.confirmTime === null));
  }, [missionList]);

  const uploadHandler = () => {
    // 사진 업로드
    console.log('사진 업로드!');
  };

  const [isSubmitCompleted, setIsSubmitCompleted] = useState(todayMission.missionImageUrl != null);
  const submitHandler = () => {
    // 제출 axios
    setIsSubmitCompleted(true);
    console.log('제출 완료!');
  };

  function newMission() {
    if (nextMissionList.length) {
      // axios 데일리미션 넘기기-> nextMissionList[0].missionStatusId 전송 confirmTime이 찍힘
      // axios 미션 조회
      // setMissionList(response.data)
    } else {
      //안됩니다
    }
  }

  const emojiList = ['🥰', '😚', '🤩', '🤗', '🥳', '🐤', '🎅', '👍', '💪', '🎁', '🎉', '✨', '💖', '🔥', '🌈', '🌟'];
  const children = (
    <div className={`${styles.FlexVertical} ${styles.AlignBaseLine} ${styles.Gap45Rem}`}>
      <div className={`${styles.FlexVertical}`}>
        <div className={`${styles.Title} ${styles.FlexHorizontal} ${styles.Gap1Rem}`}>
          <div className={`FontL`}>오늘의 미션</div>
          {isSubmitCompleted ? (
            <div></div>
          ) : (
            <div className={`${styles.FlexHorizontal} ${styles.Gap05Rem}`}>
              <div className={`FontXS FontBasic`}>{2 - nextMissionList.length}/2</div>
              <div className={`${styles.IconSpin1}`} onClick={newMission}>
                <ArrowsClockwise size={20} />
              </div>
            </div>
          )}
        </div>
        <div>
          <div className={`FontS FontBasic ${styles.MissionStatus}`}>{props.nickname}님에게</div>
          <div className={`FontS FontBasic ${styles.MissionStatus}`}>{todayMission.missionContent}</div>
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
            {isSubmitCompleted ? (
              <div className="FontBasic FontSTitle">
                미션 성공! {emojiList[Math.floor(Math.random() * emojiList.length)]}{' '}
              </div>
            ) : (
              <Button onClickHandler={submitHandler} bgc="filled">
                제출
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  return <Card {...{ tag: 2, children: children }}></Card>;
}

export default MissionManitoPage;
