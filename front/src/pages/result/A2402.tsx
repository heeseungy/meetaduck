import Card from '@/components/commons/Card';
import styles from '@/styles/result/ResultPage.module.css';
import { ResultAnalysis, ResultListProps } from '@/types/result';
// import ResultPieChart from '@/components/result/ResultPieChart';
// import ResultWord from '@/components/result/ResultWord';
import { PairRank } from '@/types/user.interface';

type A2402Props = {
  tag: number;
  me: PairRank;
  pairList: ResultListProps;
};

function A2402(a2402Props: A2402Props) {
  ////////// 이걸 recoil에 저장해놔야할듯///////////////
  const myManito = a2402Props.pairList.pairList.find((it) => it.manito.manitiId === a2402Props.me.guestId)?.manito;
  const myManiti = a2402Props.pairList.pairList.find((it) => it.manito.manitiId === a2402Props.me.guestId)?.maniti;
  /////////////////////////////////////////////
  ///// a2402props를 기반으로 axios요청///////////////
  const ManitoResult: ResultAnalysis = {
    favorability: 
  }
  const myManitoResult: ResultAnalysis = {
    favorability: myManito!.manitoFavorability,
    wordcount: 'wordCount',
    ratio: 60,
  };

  const myManitiResult: ResultAnalysis = {
    favorability: myManiti!.manitoFavorability,
    wordcount: 'wordCount',
    ratio: 40,
  };
  /////////////////////////////////////////////////////
  const children = (
    <div>
      <div className="FontMBold">
        <span>{a2402Props.tag === 1 ? `마니또 ${myManito!.nickname}` : `마니띠 ${myManiti!.nickname}`}</span>님과
        관계분석
      </div>
      <div>
        <img
          className={styles.ProfileResultUrl}
          src={a2402Props.tag === 1 ? myManito!.profileUrl : myManiti!.profileUrl}
          alt=""
        />
        <div className="FontSBold">
          우호도 {a2402Props.tag === 1 ? myManito!.manitoFavorability : myManiti!.manitoFavorability}점
        </div>
      </div>
      <div>
        <div>
          <div className="FontSBold">{a2402Props.tag === 1 ? '마니또 단어' : '내 단어'}</div>
          {/* <ResultWord /> */}
          {a2402Props.tag === 1 ?  : }
          <div className="FontSBold">{a2402Props.tag === 1 ? '내 단어' : '마니띠 단어'}</div>
          {/* <ResultWord /> */}
          {myManitiResult.wordcount}
        </div>
        <div>
          <div>
            <div className="FontSBold">대화 빈도/횟수</div>
            <div>{}회</div>
          </div>
          <div>
            <div className="FontSBold">미션 수행 횟수</div>
            <div>{}회</div>
          </div>
          <div>
            <div className="FontSBold">
              <span className="FontGreen">긍정어</span>vs<span className="FontRed">부정어</span> 사용비율
              {/* <ResultPieChart /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Card {...{ tag: 2, children: children }} />
    </>
  );
}

export default A2402;
