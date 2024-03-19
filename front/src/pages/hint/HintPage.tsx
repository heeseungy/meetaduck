import A1301 from '@/pages/hint/A1301';
import A1302 from '@/pages/hint/A1302';
import A2301 from '@/pages/hint/A2301';
import { HINT_ALL, HINT_NONE, HINT_PART, MY_PROFILE, PARTY1 } from '@/recoil/dummy';
import { Answer } from '@/types/hint.ts';
import { Party, PartyStatus, StatusType } from '@/types/party';

function HintPage() {
  const party1: Party = PARTY1;

  const startTime: Date = new Date(party1.startTime);
  const endTime: Date = new Date(party1.endTime);
  const currentTime: Date = new Date();

  let partyStatus: PartyStatus = { status: StatusType.Todo };
  if (endTime <= currentTime) {
    partyStatus = { status: StatusType.Complete };
  } else if (startTime > currentTime) {
    partyStatus = { status: StatusType.Todo };
  } else {
    partyStatus = { status: StatusType.InProgress };
  }

  const nickname: string = MY_PROFILE.nickname;

  const hintList: Answer[] = HINT_ALL;
  if (partyStatus.status === StatusType.Todo) {
    return <div>아직 파티가 시작하지 않았습니다.</div>;
  } else if (partyStatus.status === StatusType.Complete) {
    return <A2301 {...{ nickname: nickname, hintList: hintList }} />;
  } else {
    // useState를 써야하는 부분
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
