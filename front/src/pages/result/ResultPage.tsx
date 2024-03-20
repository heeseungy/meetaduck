import Slides from '@/components/commons/Slides';
import A2401 from '@/pages/result/A2401';
import A2402 from '@/pages/result/A2402';
import A1401 from '@/pages/vote/A1401';
import A1402 from '@/pages/vote/A1402';
import A1403 from '@/pages/vote/A1403';
import { MY_INFO, PAIR_LIST, PARTY_STATUS } from '@/recoil/dummy';
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
    const me: PairRank = pairList.pairList.find((it) => it.maniti.guestId === MY_INFO.guestId)!.manito;

    const children1 = <A2401 {...{ me: me, pairList: pairList }} />;
    const children2 = <A2402 {...{ tag: Role.Maniti, me: me, pairList: pairList }} />;
    const children3 = <A2402 {...{ tag: Role.Manito, me: me, pairList: pairList }} />;

    return <Slides {...{ children: [children1, children2, children3], className: 'Slides' }}></Slides>;
  } else if (PARTY_STATUS.status === StatusType.Before24) {
    // 24시간 전부터
    return (
      <>
        <A1403 />
        <A1402 />
      </>
    );
  } else {
    // 진행 중
    return (
      <>
        <A1401 />
      </>
    );
  }
}

export default ResultPage;
