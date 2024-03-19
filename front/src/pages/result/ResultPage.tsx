import Slides from '@/components/commons/Slides';
import A2401 from '@/pages/result/A2401';
import A2402 from '@/pages/result/A2402';
import A1401 from '@/pages/vote/A1401';
import A1402 from '@/pages/vote/A1402';
import A1403 from '@/pages/vote/A1403';
import { MY_INFO, PAIR_LIST, PARTY1 } from '@/recoil/dummy';
import { Party, PartyStatus, StatusType } from '@/types/party';
import { ResultListItemProps, ResultListProps } from '@/types/result';
import { PairRank } from '@/types/user.interface';

function ResultPage() {
  const party1: Party = PARTY1;

  const startTime: Date = new Date(party1.startTime);
  const endTime: Date = new Date(party1.endTime);
  const currentTime: Date = new Date();
  const beforeTime: Date = new Date(endTime.setDate(endTime.getDate() - 1));

  let partyStatus: PartyStatus = { status: StatusType.Todo };
  if (endTime <= currentTime) {
    partyStatus = { status: StatusType.Complete };
  } else if (startTime > currentTime) {
    partyStatus = { status: StatusType.Todo };
  } else {
    partyStatus = { status: StatusType.InProgress };
  }

  const me: PairRank = MY_INFO;

  if (partyStatus.status === StatusType.Todo) {
    return <div>아직 파티가 시작하지 않았습니다.</div>;
  } else if (partyStatus.status === StatusType.Complete) {
    const pairList: ResultListProps = {
      pairList: PAIR_LIST.sort(
        (a: ResultListItemProps, b: ResultListItemProps) => b.maniti.manitoFavorability - a.maniti.manitoFavorability,
      ),
    };

    enum Role {
      Manito = 2, //내가 마니또일때
      Maniti = 1, //내가 마니띠일때
    }
    const children1 = <A2401 {...{ me: me, pairList: pairList }} />;
    const children2 = <A2402 {...{ tag: Role.Maniti, me: me, pairList: pairList }} />;
    const children3 = <A2402 {...{ tag: Role.Manito, me: me, pairList: pairList }} />;

    return <Slides {...{ children: [children1, children2, children3], className: 'Slides' }}></Slides>;
  } else {
    if (beforeTime > currentTime) {
      return (
        <>
          <A1401 />
        </>
      );
    } else {
      return (
        <>
          <A1402 />
          <A1403 />
        </>
      );
    }
  }
}

export default ResultPage;
