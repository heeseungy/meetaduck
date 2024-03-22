import Slides from '@/components/commons/Slides';
import MissionCompletePage from '@/pages/mission/MissionCompletePage';
import { DATE_DIFF, MISSION_RESULT_LIST } from '@/recoil/dummy';
import { MissionResultList } from '@/types/mission';
import { Role } from '@/types/party';

function MissionPage() {
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

export default MissionPage;
