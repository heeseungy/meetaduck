import { useEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import ResultSlides from '@/pages/result/ResultSlidesPage';
import VoteAfterPage from '@/pages/vote/VoteAfterPage';
import VoteBefore24Page from '@/pages/vote/VoteBefore24Page';
import VoteInProgressPage from '@/pages/vote/VoteInProgressPage';
import { currentTimeState, loginState, partyStatusState } from '@/recoil/atom';
import { MY_PROFILE } from '@/recoil/dummy';
import { getOneInfoService } from '@/services/resultService';
import { StatusType } from '@/types/party';
import { ListProfile } from '@/types/user.interface';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function ResultPage() {
  const login = useRecoilValue(loginState);
  const setcurrentTime = useSetRecoilState(currentTimeState);
  const partyStatus = useRecoilValue(partyStatusState);
  const [loading, setLoading] = useState(true);
  const [myProfile, setMyProfile] = useState<ListProfile>(MY_PROFILE);
  useEffect(() => {
    setcurrentTime(new Date().toISOString());
    // 참가자 단일 조회 axios
    getOneInfoService(login.guestId).then((data: ListProfile) => {
      setMyProfile(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [partyStatus]);

  if (loading) {
    console.log('resultPage Loading');
    return <Loading />;
  } else {
    if (StatusType[partyStatus] === StatusType.Todo) {
      // 시작 전
      return <div>아직 파티가 시작하지 않았습니다.</div>;
    } else if (StatusType[partyStatus] === StatusType.Complete) {
      // 결과 발표
      // return <div>여보세용</div>;
      return <ResultSlides />;
    } else if (StatusType[partyStatus] === StatusType.Before24) {
      // 24시간 전부터
      if (myProfile.votedId === 0) {
        return (
          <>
            <VoteBefore24Page {...{ guestId: myProfile.guestId, myProfile: myProfile, setMyProfile: setMyProfile }} />
          </>
        );
      } else {
        return (
          <>
            <VoteAfterPage />
          </>
        );
      }
    } else {
      // 진행 중
      return (
        <>
          <VoteInProgressPage />
        </>
      );
    }
  }
}

export default ResultPage;
