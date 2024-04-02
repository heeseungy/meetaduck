import { useState } from 'react';

import Card from '@/components/commons/Card';
import MissionImage from '@/components/mission/MissionImage';
import MissionSlider from '@/components/mission/MissionSlider';
import styles from '@/styles/mission/MissionCompletePage.module.css';
import { MissionResultList } from '@/types/mission';
import { Role } from '@/types/party';
import { Party } from '@/types/party';

interface MissionCompletePageProps {
  role: number;
  party: Party;
  nickname: string;
  missionResultList: MissionResultList;
}

function MissionCompletePage({ role, party, nickname, missionResultList }: MissionCompletePageProps) {
  const mission = Role.Manito === role ? missionResultList.myMission : missionResultList.manitoMission;
  const count = mission.filter((it) => it.missionImageUrl != null).length;
  const [checkedDay, setcheckedDay] = useState(0);
  // 날짜계산
  const startTime = new Date(party.startTime);
  const endTime = new Date(party.endTime);
  // const date = mission.length; 
  // const date = Math.ceil(Math.abs((endTime.getTime() - startTime.getTime()) / (24 * 60 * 1000)));
  const date = Math.ceil(Math.abs((endTime.getTime() - startTime.getTime()) / (3 * 60 * 1000) - 1));
  console.log('mission complete date', date); 
  let days: string[] = [];
  for (let i = 0; i < date; i++) {
    const d = new Date();
    const month = new Date(d.setMonth(startTime.getMonth() + 1)).getMonth();
    const day = new Date(d.setDate(startTime.getDate() + i)).getDate();
    days.push(`${month}/${day}`);
  }

  const ChangeDate = (idx: number) => {
    setcheckedDay(idx);
  };
  const children = (
    <div>
      <div className={`FontMTitle ${styles.CardTitle}`}>
        {Role.Manito === role ? '내가 수행한 미션' : '마니또가 수행한 미션'}
      </div>
      <div className={`FontSBold ${styles.MissionHorizonScrollContainer}`}>
        <MissionSlider className="mission-slider">
          {days.map((it, idx) => (
            <div className={styles.Height8rem} key={idx} onClick={() => ChangeDate(idx)}>
              <div
                className={`${styles.HorizonScrollItem} 
                ${
                  mission[idx].missionImageUrl != null
                    ? Role.Manito === role
                      ? 'BackgroundOrange'
                      : styles.ManitoButton
                    : 'BackgroundGray'
                }
                ${idx === checkedDay ? styles.ClickedItem : styles.UnclickedItem}
                `}
              >
                <div
                  className={`${styles.ItemText} ${role != Role.Manito && mission[idx].missionImageUrl != null ? 'FontOrange' : 'FontWhite'}`}
                >
                  <div>{it}</div>
                  <div>{idx + 1}일</div>
                </div>
              </div>
            </div>
          ))}
        </MissionSlider>
      </div>
      <MissionImage {...{ day: checkedDay, mission: mission, nickname: nickname }} />
    </div>
  );

  return (
    <div className={`${styles.MissionCompleteContainer}`}>
      {role === Role.Manito ? (
        <div className={`FontMTitle FontBasic ${styles.TitleContainer}`}>
          <p>
            진행기간 <span className={`FontRed`}>{date} </span>일 중
          </p>
          <p>
            총 <span className={`FontRed`}>{count} </span>개의 미션을 수행했어요!
          </p>
        </div>
      ) : (
        <div className={`FontMTitle FontBasic ${styles.TitleContainer}`}>
          <p>
            진행기간 <span className={`FontRed`}>{date} </span>일 중
          </p>
          <p>
            총 <span className={`FontRed`}>{count} </span>개의 선물을 받았어요!
          </p>
        </div>
      )}
      <Card {...{ tag: 1, children: children }} />
    </div>
  );
}

export default MissionCompletePage;
