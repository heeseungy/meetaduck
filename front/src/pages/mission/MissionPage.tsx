import { HINT_ALL, HINT_NONE, HINT_PART, MY_PROFILE, PARTY_STATUS } from '@/recoil/dummy';
import { StatusType } from '@/types/party';
import MissionFirstPage from './MissionFirstPage';
import MissionTodayPage from './MissionTodayPage';
import MissionManitoPage from './MissionManitoPage';
import MissionManitiPage from './MissionManitiPage';

import Slides from '@/components/commons/Slides';
import styles from '@/styles/mission/Mission.module.css';


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
  }
}

export default MissionPage;
