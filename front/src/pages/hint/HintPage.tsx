import HintInProgressPage from '@/pages/hint/HintInProgressPage';
import HintNonePage from '@/pages/hint/HintNonePage';
import HintResultPage from '@/pages/hint/HintResultPage';
import { HINT_ALL, HINT_NONE, HINT_PART, MY_PROFILE, PARTY_STATUS } from '@/recoil/dummy';
import { Answer } from '@/types/hint.ts';
import { StatusType } from '@/types/party';

function HintPage() {
  const nickname: string = MY_PROFILE.nickname;

  const hintList: Answer[] = HINT_ALL;
  if (PARTY_STATUS.status === StatusType.Todo) {
    // 시작전
    return <div>아직 파티가 시작하지 않았습니다.</div>;
  } else if (PARTY_STATUS.status === StatusType.Complete) {
    // 결과
    return <HintResultPage {...{ nickname: nickname, hintList: hintList }} />;
  } else {
    // 24시간 전+ 진행중
    //
    // const hintList: Answer[] = HINTNONE;
    const hintList: Answer[] = HINT_PART;
    if (hintList.length != 0) {
      return <HintInProgressPage {...{ nickname: nickname, hintList: hintList }} />;
    } else {
      return <HintNonePage {...{ nickname: nickname }} />;
    }
  }
}

export default HintPage;
