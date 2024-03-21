import Slides from '@/components/commons/Slides';
import PairResultPage from '@/pages/result/PairResultPage';
import ResultPairListPage from '@/pages/result/ResultPairListPage';
import VoteAfterPage from '@/pages/vote/VoteAfterPage';
import VoteBefore24Page from '@/pages/vote/VoteBefore24Page';
import VoteBeforePage from '@/pages/vote/VoteInProgressPage';
import { MY_INFO, MY_PROFILE, PAIR_LIST, PARTY_STATUS } from '@/recoil/dummy';
import { StatusType } from '@/types/party';
import { ResultListItemProps, ResultListProps } from '@/types/result';
import { PairRank } from '@/types/user.interface';

enum Role {
  Manito = 2, //내가 마니또일때
  Maniti = 1, //내가 마니띠일때
}

function ResultPage() {
  if (PARTY_STATUS.status === StatusType.Todo) {
    // 시작 전
    return <div>아직 파티가 시작하지 않았습니다.</div>;
  } else if (PARTY_STATUS.status === StatusType.Complete) {
    // 결과 발표
    const pairList: ResultListProps = {
      pairList: PAIR_LIST.sort(
        (a: ResultListItemProps, b: ResultListItemProps) => b.maniti.manitoFavorability - a.maniti.manitoFavorability,
      ),
    };
    const me: PairRank = pairList.pairList.find((it) => it.manito.guestId === MY_INFO.guestId)!.manito;

    const children1 = <ResultPairListPage {...{ me: me, pairList: pairList }} />;
    const children2 = <PairResultPage {...{ tag: Role.Maniti, me: me, pairList: pairList }} />;
    const children3 = <PairResultPage {...{ tag: Role.Manito, me: me, pairList: pairList }} />;

    return <Slides {...{ children: [children1, children2, children3], className: 'Slides' }}></Slides>;
  } else if (PARTY_STATUS.status === StatusType.Before24) {
    // 24시간 전부터
    if (MY_PROFILE.votedId === 0) {
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
