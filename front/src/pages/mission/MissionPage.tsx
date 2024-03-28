import { useEffect, useState } from 'react';

import Slides from '@/components/commons/Slides';
import MissionCompletePage from '@/pages/mission/MissionCompletePage';
import MissionFirstPage from '@/pages/mission/MissionFirstPage';
import MissionManitiPage from '@/pages/mission/MissionManitiPage';
import MissionManitoPage from '@/pages/mission/MissionManitoPage';
import { currentTimeState, loginState, partyState, partyStatusState } from '@/recoil/atom';
import { MISSION_RESULT_LIST } from '@/recoil/dummy';
import { completeMissionLoad, manitoNickname } from '@/services/missionTodayService';
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
  const [manitiNickname, setManitiNickname] = useState('');
  const [missionResultList, setMissionResultList] = useState<MissionResultList>(MISSION_RESULT_LIST);
  useEffect(() => {
    setcurrentTime(new Date().toISOString());
    manitoNickname(login.guestId).then((data) => {
      setManitiNickname(data);
    });

    if (StatusType[partyStatus] == StatusType.Complete) {
      completeMissionLoad(login.guestId).then((data: MissionResultList) => {
        setMissionResultList(data);
      });
    }
  }, []);

  if (StatusType[partyStatus] == StatusType.Complete) {
    return (
      <>
        <Slides className={'Slides'}>
          <MissionCompletePage
            {...{
              role: Role.Manito,
              party: party,
              nickname: manitiNickname,
              missionResultList: missionResultList,
            }}
          />
          <MissionCompletePage
            {...{ role: Role.Maniti, party: party, nickname: login.nickname, missionResultList: missionResultList }}
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
    const checkDate = sessionStorage.getItem('checkDate')
    return (
      
      <Slides {...{ className: 'Slides' }}>
        <MissionManitoPage {...{ nickname: manitiNickname }} />
        <MissionManitiPage {...{ nickname: login.nickname }} />
      </Slides>
    );
  }
}

export default MissionPage;
