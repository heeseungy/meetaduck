import A1301 from '@/pages/hint/A1301';
import A1302 from '@/pages/hint/A1302';
import A2301 from '@/pages/hint/A2301';
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
    return <A2301 {...{ nickname: nickname, hintList: hintList }} />;
  } else {
    // 24시간 전+ 진행중
    //
    // const hintList: Answer[] = HINTNONE;
    const hintList: Answer[] = HINT_PART;
    if (hintList.length != 0) {
      return <A1301 {...{ nickname: nickname, hintList: hintList }} />;
    } else {
      return <A1302 {...{ nickname: nickname }} />;
    }
  }
}

export default HintPage;
