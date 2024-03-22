import Slides from '@/components/commons/Slides';
import MissionCompletePage from '@/pages/mission/MissionCompletePage';
import { DATE_DIFF, MISSION_RESULT_LIST } from '@/recoil/dummy';
import { MY_PROFILE, PARTY_STATUS } from '@/recoil/dummy';
import styles from '@/styles/mission/Mission.module.css';
import { MissionResultList } from '@/types/mission';
import { Role } from '@/types/party';
import { StatusType } from '@/types/party';

import MissionFirstPage from './MissionFirstPage';
import MissionManitiPage from './MissionManitiPage';
import MissionManitoPage from './MissionManitoPage';
import MissionTodayPage from './MissionTodayPage';

function MissionPage() {
  const nickname: string = MY_PROFILE.nickname;
  const successTime: string | null = '2024-03-13T00:00:00Z';
  // const successTime: string | null = null;

  if (PARTY_STATUS.status == StatusType.Todo) {
    return (
      <div>
        <div className={`FontXXL ${styles.Heading}`}>오늘의 미션</div>
        <MissionFirstPage {...{ nickname: nickname }} />
      </div>
    );
  } else if (PARTY_STATUS.status == StatusType.InProgress) {
    const children1 = <MissionManitoPage {...{ nickname: nickname }} />;
    const children2 = <MissionManitiPage {...{ nickname: nickname, successTime: successTime }} />;

    return <Slides {...{ children: [children1, children2], className: 'Slides' }}></Slides>;
  } else {
    const missionResultList: MissionResultList = MISSION_RESULT_LIST;
    return (
      
      <>
        <Slides className={'Slides'}>
          <MissionCompletePage {...{ tag: Role.Manito, date: DATE_DIFF, missionResultList: missionResultList }} />
          <MissionCompletePage {...{ tag: Role.Maniti, date: DATE_DIFF, missionResultList: missionResultList }} />
        </Slides>
      </>
    );
  }
}

export default MissionPage;
