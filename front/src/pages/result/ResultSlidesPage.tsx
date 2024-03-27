import { useEffect, useState } from 'react';

import Slides from '@/components/commons/Slides';
import PairResultPage from '@/pages/result/PairResultPage';
import ResultPairListPage from '@/pages/result/ResultPairListPage';
import { loginState, partyState } from '@/recoil/atom';
import { PAIR_LIST } from '@/recoil/dummy';
import { MANITI_RESULT, MANITO_RESULT } from '@/recoil/dummy';
import { getManitiAnalysis, getManitoAnalysis, pairResultService } from '@/services/resultService';
import { Role } from '@/types/party';
import { ManitoResultAnalysis, ResultListItemProps, ResultListProps } from '@/types/result';
import { PairRank } from '@/types/user.interface';
import { useRecoilValue } from 'recoil';

function ResultSlidesPage() {
  const login = useRecoilValue(loginState);
  const party = useRecoilValue(partyState);
  const [pairList, setPairList] = useState<ResultListProps>({
    pairList: PAIR_LIST,
  });
  const [manitoResult, setManitoResult] = useState<ManitoResultAnalysis>(MANITO_RESULT);
  const [manitiResult, setManitiResult] = useState<ManitoResultAnalysis>(MANITI_RESULT);
  const [me, setMe] = useState<PairRank>(PAIR_LIST[0].manito);
  const [manito, setManito] = useState<PairRank>(PAIR_LIST[0].manito);
  const [maniti, setManiti] = useState<PairRank>(PAIR_LIST[0].manito);
  
  useEffect(() => {
    // 결과 조회 axios
    pairResultService(party.partyId)
      .then((data) => {
        const pairListData = data.sort(
          (a: ResultListItemProps, b: ResultListItemProps) =>
            b.maniti.favorability.manitoFavorability - a.maniti.favorability.manitoFavorability,
        );
        setPairList({
          pairList: pairListData,
        });
        console.log('결과조회', pairListData);
      })
      .catch((err) => console.log(err));

    getManitoAnalysis(login.guestId)
      .then((data: ManitoResultAnalysis) => {
        setManitoResult(data);
      })
      .catch((err) => console.log(err));

    getManitiAnalysis(login.guestId)
      .then((data: ManitoResultAnalysis) => {
        setManitiResult(data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setMe(pairList.pairList.filter((it) => it.manito.guestId === login.guestId)[0].manito);
    console.log('pairList', pairList);
    console.log('me', me);
  }, [pairList]);

  return (
    <>
      <Slides {...{ className: 'Slides' }}>
        <ResultPairListPage {...{ me: me, pairList: pairList }} />
        <PairResultPage {...{ tag: Role.Maniti, me: me, pairList: pairList, analysis: manitoResult }} />
        <PairResultPage {...{ tag: Role.Manito, me: me, pairList: pairList, analysis: manitiResult }} />
      </Slides>
    </>
  );
}

export default ResultSlidesPage;
