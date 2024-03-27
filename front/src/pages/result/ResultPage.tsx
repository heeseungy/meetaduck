import { useEffect, useState } from 'react';

import Slides from '@/components/commons/Slides';
import PairResultPage from '@/pages/result/PairResultPage';
import ResultPairListPage from '@/pages/result/ResultPairListPage';
import VoteAfterPage from '@/pages/vote/VoteAfterPage';
import VoteBefore24Page from '@/pages/vote/VoteBefore24Page';
import VoteBeforePage from '@/pages/vote/VoteInProgressPage';
import { currentTimeState, loginState, partyState, partyStatusState } from '@/recoil/atom';
import { PAIR_LIST } from '@/recoil/dummy';
import { getOneInfoService, pairResultService } from '@/services/resultService';
import { StatusType } from '@/types/party';
import { Role } from '@/types/party';
import { ResultListItemProps, ResultListProps } from '@/types/result';
import { ListProfile, PairRank } from '@/types/user.interface';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function ResultPage() {
  const login = useRecoilValue(loginState);
  const setcurrentTime = useSetRecoilState(currentTimeState);
  // const currentTime = useRecoilValue(currentTimeState);
  const party = useRecoilValue(partyState);
  const partyStatus = useRecoilValue(partyStatusState);
  const [myProfile, setMyProfile] = useState<ListProfile>();
  const [pairList, setPairList] = useState<ResultListProps>({
    pairList: PAIR_LIST.sort(
      (a: ResultListItemProps, b: ResultListItemProps) => b.maniti.manitoFavorability - a.maniti.manitoFavorability,
    ),
  });
  useEffect(() => {
    setcurrentTime(new Date().toISOString());
    if (StatusType[partyStatus] === StatusType.Complete) {
      // 참가자 단일 조회 axios
      getOneInfoService(login.guestId).then((data) => {
        setMyProfile(data);
      });
      // 결과 조회 axios
      pairResultService(party.partyId)
        .then((data) => {
          setPairList({
            pairList: data.sort(
              (a: ResultListItemProps, b: ResultListItemProps) =>
                b.maniti.manitoFavorability - a.maniti.manitoFavorability,
            ),
          });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (StatusType[partyStatus] === StatusType.Todo) {
    // 시작 전
    return <div>아직 파티가 시작하지 않았습니다.</div>;
  } else if (StatusType[partyStatus] === StatusType.Complete) {
    // 결과 발표
    // const me: PairRank = pairList.pairList.find((it) => it.manito.guestId === login.guestId)!.manito;
    return (
      <div></div>
      // <Slides {...{ className: 'Slides' }}>
      //   <ResultPairListPage {...{ me: me, pairList: pairList }} />
      //   <PairResultPage {...{ tag: Role.Maniti, me: me, pairList: pairList }} />
      //   <PairResultPage {...{ tag: Role.Manito, me: me, pairList: pairList }} />
      // </Slides>
    );
  } else if (StatusType[partyStatus] === StatusType.Before24) {
    // 24시간 전부터
    if (myProfile!.votedId === 0) {
      return (
        <>
          <VoteBefore24Page />
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
        <VoteBeforePage />
      </>
    );
  }
}

export default ResultPage;
