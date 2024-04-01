import { useLayoutEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import Slides from '@/components/commons/Slides';
import PairResultPage from '@/pages/result/PairResultPage';
import ResultPairListPage from '@/pages/result/ResultPairListPage';
import { loginState, partyState } from '@/recoil/atom';
import { MANITI_RESULT, MANITO_RESULT, PAIR_LIST } from '@/recoil/dummy';
import { getManitiAnalysis, getManitoAnalysis, pairResultService } from '@/services/resultService';
import { Role } from '@/types/party';
import { ManitoResultAnalysis, ResultListItemProps, ResultListProps } from '@/types/result';
import { PairRank } from '@/types/user.interface';
import { useRecoilValue } from 'recoil';

function ResultSlidesPage() {
  const login = useRecoilValue(loginState);
  const party = useRecoilValue(partyState);
  const [loading, setLoading] = useState(true);
  const [pairList, setPairList] = useState<ResultListProps>({
    pairList: PAIR_LIST,
  });
  const [manitoResult, setManitoResult] = useState<ManitoResultAnalysis>(MANITO_RESULT);
  const [manitiResult, setManitiResult] = useState<ManitoResultAnalysis>(MANITI_RESULT);
  const [me, setMe] = useState<PairRank>(PAIR_LIST[0].manito);
  const [err, setErr] = useState(false);
  useLayoutEffect(() => {
    // 결과 조회 axios
    pairResultService(party.partyId)
      .then((data: ResultListItemProps[]) => {
        const pairListData = data.sort(
          (a: ResultListItemProps, b: ResultListItemProps) =>
            b.maniti.favorability.manitoFavorability - a.maniti.favorability.manitoFavorability,
        );
        setPairList({
          pairList: pairListData,
        });
        setMe(pairListData.filter((it) => it.manito.guestId === login.guestId)[0].manito);
      })
      .then(() => {
        getManitoAnalysis(login.guestId)
          .then((data: ManitoResultAnalysis) => {
            setManitoResult(data);
          })
          .catch((err) => console.log(err));
        getManitiAnalysis(login.guestId)
          .then((data: ManitoResultAnalysis) => {
            setManitiResult(data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
      });
  }, []);

  return (
    <>
      {err || loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <Slides {...{ className: 'Slides' }}>
          <ResultPairListPage {...{ me: me, pairList: pairList }} />
          <PairResultPage {...{ tag: Role.Maniti, me: me, pairList: pairList, analysis: manitoResult }} />
          <PairResultPage {...{ tag: Role.Manito, me: me, pairList: pairList, analysis: manitiResult }} />
        </Slides>
      )}
    </>
  );
}

export default ResultSlidesPage;
