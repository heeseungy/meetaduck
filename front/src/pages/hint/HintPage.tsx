import { useEffect } from 'react';
import { useState } from 'react';

import HintInProgressPage from '@/pages/hint/HintInProgressPage';
import HintNonePage from '@/pages/hint/HintNonePage';
import HintResultPage from '@/pages/hint/HintResultPage';
import { currentTimeState, loginState, partyStatusState } from '@/recoil/atom';
import { HINT_ALL, HINT_NONE, HINT_PART } from '@/recoil/dummy';
import { hintPageService } from '@/services/hintPageService';
import { Answer } from '@/types/hint.ts';
import { StatusType } from '@/types/party';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function HintPage() {
  const login = useRecoilValue(loginState);
  const setcurrentTime = useSetRecoilState(currentTimeState);
  // const currentTime = useRecoilValue(currentTimeState);
  const partyStatus = useRecoilValue(partyStatusState);
  useEffect(() => {
    setcurrentTime(new Date().toISOString());
    console.log(partyStatus);
  }, []);
  const nickname: string = login.nickname;

  const [hintList, setHintList] = useState<Answer[]>([]);

  useEffect(() => {
    // 미션조회
    hintPageService(login.guestId).then((data) => {
      setHintList(data);
    });
  }, []);

  if (StatusType[partyStatus] === StatusType.Todo) {
    // 시작전
    return <div>아직 파티가 시작하지 않았습니다.</div>;
  } else if (StatusType[partyStatus] === StatusType.Complete) {
    // 결과
    return <HintResultPage {...{ nickname: nickname, hintList: hintList! }} />;
  } else {
    // 24시간 전+ 진행중
    //
    // const hintList: Answer[] = HINTNONE;
    // const hintList: Answer[] = HINT_PART;
    if (hintList.length != 0) {
      return <HintInProgressPage {...{ nickname: nickname, hintList: hintList! }} />;
    } else {
      return <HintNonePage {...{ nickname: nickname }} />;
    }
  }
}

export default HintPage;
