import A1301 from '@/pages/hint/A1301';
import A1302 from '@/pages/hint/A1302';
import A2301 from '@/pages/hint/A2301';
import { Answer } from '@/types/hint.ts';
import { Party, PartyStatus, StatusType } from '@/types/party';

// Recoil로 옮기면 지울거

function HintPage() {
  ////////////////////////////////////////////////////////
  // 이부분은 recoil에 저장해야함///////////////////////////
  const party1: Party = {
    partyId: 3,
    accessCode: 'tlz5vy',
    startTime: '2024-03-11T21:00:00.000Z',
    endTime: '2024-07-13T21:00:00.000Z',
    deleted: false,
    userId: 4,
  };

  const startTime: Date = new Date(party1.startTime);
  const endTime: Date = new Date(party1.endTime);
  const currentTime: Date = new Date();

  let partyStatus: PartyStatus = { status: StatusType.Todo };
  // useState를 써야하는 부분
  if (endTime <= currentTime) {
    partyStatus = { status: StatusType.Complete };
  } else if (startTime > currentTime) {
    partyStatus = { status: StatusType.Todo };
  } else {
    partyStatus = { status: StatusType.InProgress };
  }

  const nickname: string = '000';
  ////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////

  if (partyStatus.status === StatusType.Todo) {
    return <div>아직 파티가 시작하지 않았습니다.</div>;
  } else if (partyStatus.status === StatusType.Complete) {
    ////////////////////////////////////////////////////////////////////
    ////// axios 요청////////////////////////////////////////////////////
    const hintList: Answer[] = [
      {
        hintId: 3,
        hintContent: '최근에 본 가장 인상 깊은 영화는 무엇인가요?',
        hintStatusAnswer: '윙카',
      },
      { hintId: 25, hintContent: '강아지 vs 고양이?', hintStatusAnswer: '고양이' },
      { hintId: 25, hintContent: '강아지 vs 고양이?', hintStatusAnswer: '고양이' },
      { hintId: 25, hintContent: '강아지 vs 고양이?', hintStatusAnswer: '고양이' },
      { hintId: 25, hintContent: '강아지 vs 고양이?', hintStatusAnswer: '고양이' },
      { hintId: 25, hintContent: '강아지 vs 고양이?', hintStatusAnswer: '고양이' },
      { hintId: 25, hintContent: '강아지 vs 고양이?', hintStatusAnswer: '고양이' },
    ];
    ////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////

    return <A2301 {...{ nickname: nickname, hintList: hintList }} />;
  } else {
    const hintList: Answer[] = [];
    if (hintList.length != 0) {
      return <A1301 {...{ nickname: nickname, hintList: hintList }} />;
    } else {
      return <A1302 {...{ nickname: nickname }} />;
    }
  }
}

export default HintPage;
