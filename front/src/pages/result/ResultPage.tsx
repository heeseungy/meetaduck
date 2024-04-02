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
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);


  const A = <div>아직 파티가 시작하지 않았습니다.</div>;
  const B = <ResultSlides />;
  const C =  <VoteBefore24Page {...{ guestId: myProfile.guestId, myProfile: myProfile, setMyProfile: setMyProfile }} />
  const D =             <VoteAfterPage />;
  const E =           <VoteInProgressPage />
  
  const StatusResult = {
    'Todo': A, 'Complete': B, 'Before24':{'C': C, 'D': D}, 'InProgress': E
  }
  return (

    <>
 {loading? 
  <div style={{position: 'absolute',top:'0rem', zIndex: 1}}>
    <Loading />
  </div>
 :<></>
} 
{partyStatus==='Before24'? myProfile.votedId===0? StatusResult['Before24'].C: StatusResult['Before24'].D  :StatusResult[partyStatus]}

</>

)
}
export default ResultPage;
