import { useEffect } from 'react';

import Slides from '@/components/commons/Slides';
import MissionCompletePage from '@/pages/mission/MissionCompletePage';
import MissionFirstPage from '@/pages/mission/MissionFirstPage';
import MissionManitiPage from '@/pages/mission/MissionManitiPage';
import MissionManitoPage from '@/pages/mission/MissionManitoPage';
import { currentTimeState, loginState, partyState, partyStatusState } from '@/recoil/atom';
import { DATE_DIFF, MANITI_PROFILE, MISSION_RESULT_LIST, MY_PROFILE } from '@/recoil/dummy';
import styles from '@/styles/mission/Mission.module.css';
import { MissionResultList } from '@/types/mission';
import { Role } from '@/types/party';
import { StatusType } from '@/types/party';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function MissionPage() {
  const login = useRecoilValue(loginState);
  const setcurrentTime = useSetRecoilState(currentTimeState);
  const currentTime = useRecoilValue(currentTimeState);
  const partyStatus = useRecoilValue(partyStatusState);
  const party = useRecoilValue(partyState);
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
          <MissionCompletePage
            {...{
              role: Role.Manito,
              party: party,
              nickname: MANITI_PROFILE.nickname,
              missionResultList: missionResultList,
            }}
          />
          <MissionCompletePage
            {...{ role: Role.Maniti, party: party, nickname: nickname, missionResultList: missionResultList }}
          />
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
