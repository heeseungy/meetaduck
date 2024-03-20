import Card from '@/components/commons/Card';
import ResultCountCard from '@/components/result/ResultCountCard';
import ResultDoughnutChart from '@/components/result/ResultDoughnutChart';
import { MANITI_RESULT, MANITO_RESULT, MY_MANITI_RESULT, MY_MANITO_RESULT } from '@/recoil/dummy';
import styles from '@/styles/result/ResultPage.module.css';
import { ManitoResultAnalysis, ResultAnalysis, ResultListProps } from '@/types/result';
// import ResultWord from '@/components/result/ResultWord';
import { PairRank } from '@/types/user.interface';

// tag: 1: 첫번째 2: 두번째
type A2402Props = {
  tag: number;
  me: PairRank;
  pairList: ResultListProps;
};

function A2402(a2402Props: A2402Props) {
  const manito = a2402Props.pairList.pairList.find((it) => it.manito.manitiId === a2402Props.me.guestId)?.manito;
  const maniti = a2402Props.pairList.pairList.find((it) => a2402Props.me.manitiId === it.maniti.guestId)?.maniti;

  // axios
  const manitoResult: ManitoResultAnalysis = MANITO_RESULT;
  const myManitiResult: ResultAnalysis = MY_MANITI_RESULT;
  const myManitoResult: ManitoResultAnalysis = MY_MANITO_RESULT;
  const manitiResult: ResultAnalysis = MANITI_RESULT;

  const children = (
    <div className={styles.Conatiner}>
      <div className={styles.ConatinerTitle}>
        <div className={`FontMBold ${styles.MarginBottom1_5}`}>
          <span>{a2402Props.tag === 1 ? `마니또 ${manito!.nickname}` : `마니띠 ${maniti!.nickname}`}</span>님과 관계분석
        </div>
        <div>
          <img
            className={`${styles.ProfileResultUrl} ${styles.MarginBottom1}`}
            src={a2402Props.tag === 1 ? manito!.profileUrl : maniti!.profileUrl}
            alt=""
          />
          <div className="FontSBold">
            우호도 {a2402Props.tag === 1 ? manito!.manitoFavorability : maniti!.manitoFavorability}점
          </div>
        </div>
      </div>
      <div>
        <div className={styles.Row}>
          <div className={styles.Column}>
            <div className="FontMBold">{a2402Props.tag === 1 ? '마니또 단어' : '내 단어'}</div>
            {/* <ResultWord />  모르겠다 일단넘겨*/}
            <div>{a2402Props.tag === 1 ? manitoResult!.wordcount : myManitoResult!.wordcount}</div>
          </div>
          <div className={styles.Column}>
            <div className="FontMBold">{a2402Props.tag === 1 ? '내 단어' : '마니띠 단어'}</div>
            {/* <ResultWord /> */}
            <div>{a2402Props.tag === 1 ? myManitiResult!.wordcount : manitiResult!.wordcount}</div>
          </div>
        </div>
        <div className={styles.Row}>
          <div className={styles.Column}>
            <div className={`${styles.MarginBottom1_5} ${styles.Column}`}>
              <div className={`FontSBold ${styles.MarginBottom1}`}>대화 빈도/횟수</div>
              <ResultCountCard {...{ count: 1 }} />
              {/* 아직 안정해짐 */}
            </div>
            <div className={`${styles.MarginBottom1_5} ${styles.Column}`}>
              <div className={`FontSBold ${styles.MarginBottom1}`}>미션 수행 횟수</div>
              {a2402Props.tag === 1 ? (
                <ResultCountCard {...{ count: manitoResult.missionSuccess }} />
              ) : (
                <ResultCountCard {...{ count: myManitoResult.missionSuccess }} />
              )}
            </div>
          </div>
          <div>
            <div className={`FontSBold ${styles.Column} ${styles.MarginBottom1_5}`}>
              <div className={styles.MarginBottom_5}>
                <span className="FontGreen">긍정어</span>vs<span className="FontRed">부정어</span>{' '}
              </div>
              <div>사용비율</div>
            </div>

            <div className={styles.DoughnutChartContainer}>
              {a2402Props.tag === 1 ? (
                <ResultDoughnutChart {...myManitiResult!.ratio} />
              ) : (
                <ResultDoughnutChart {...manitiResult!.ratio} />
              )}
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
