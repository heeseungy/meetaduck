import MissionCompletePage from '@/pages/mission/MissionCompletePage';
import { DATE_DIFF } from '@/recoil/dummy';
import { Role } from '@/types/party';

function MissionPage() {
  return (
    <>
      <MissionCompletePage {...{ tag: Role.Manito, date: DATE_DIFF }} />
      <MissionCompletePage {...{ tag: Role.Maniti, date: DATE_DIFF }} />
    </>
  );
}

export default MissionPage;
