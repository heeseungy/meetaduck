import { useEffect } from 'react';

import Slides from '@/components/commons/Slides';
import MissionCompletePage from '@/pages/mission/MissionCompletePage';
import { currentTimeState, loginState, partyStatusState } from '@/recoil/atom';
import { DATE_DIFF, MANITI_PROFILE, MISSION_RESULT_LIST, MY_PROFILE } from '@/recoil/dummy';
import styles from '@/styles/mission/Mission.module.css';
import { MissionResultList } from '@/types/mission';
import { Role } from '@/types/party';
import { StatusType } from '@/types/party';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import MissionFirstPage from './MissionFirstPage';
import MissionManitiPage from './MissionManitiPage';
import MissionManitoPage from './MissionManitoPage';
import MissionTodayPage from './MissionTodayPage';

function MissionPage() {
  const login = useRecoilValue(loginState);
  const setcurrentTime = useSetRecoilState(currentTimeState);
  const currentTime = useRecoilValue(currentTimeState);
  const partyStatus = useRecoilValue(partyStatusState);

  useEffect(() => {
    setcurrentTime(new Date().toISOString());
    console.log(partyStatus);
  }, []);

  const nickname: string = login.nickname;
  const successTime: string | null = '2024-03-13T00:00:00Z';
  // const successTime: string | null = null;

  if (StatusType[partyStatus] == StatusType.Complete) {
    const missionResultList: MissionResultList = MISSION_RESULT_LIST;
    return (
      <>
        <Slides className={'Slides'}>
          <MissionCompletePage {...{ tag: Role.Manito, date: DATE_DIFF, missionResultList: missionResultList }} />
          <MissionCompletePage {...{ tag: Role.Maniti, date: DATE_DIFF, missionResultList: missionResultList }} />
        </Slides>
      </>
    );
  } else {
    // return (
    //   <div>
    //     <div className={`FontXXL ${styles.Heading}`}>오늘의 미션</div>
    //     <MissionFirstPage {...{ nickname: nickname }} />
    //   </div>
    // );
    return (
      <Slides {...{ className: 'Slides' }}>
        <MissionManitoPage {...{ nickname: MANITI_PROFILE.nickname }} />
        <MissionManitiPage {...{ nickname: nickname, successTime: successTime }} />
      </Slides>
    );
  }
}

export default MissionPage;
