import Card from '@/components/commons/Card';
import ResultCountCard from '@/components/result/ResultCountCard';
import ResultDoughnutChart from '@/components/result/ResultDoughnutChart';
import ResultWordCloudChart from '@/components/result/resultWordCloud';
import { MANITI_RESULT, MANITO_RESULT } from '@/recoil/dummy';
import styles from '@/styles/result/ResultPage.module.css';
import { ManitoResultAnalysis, ResultListProps } from '@/types/result';
// import ResultWord from '@/components/result/ResultWord';
import { PairRank } from '@/types/user.interface';

// tag: 1: 첫번째 2: 두번째
type PairResultProps = {
  tag: number;
  me: PairRank;
  pairList: ResultListProps;
};

function PairResultPage(pairResultProps: PairResultProps) {
  const manito = pairResultProps.pairList.pairList.find(
    (it) => it.manito.manitiId === pairResultProps.me.guestId,
  )?.manito;
  const maniti = pairResultProps.pairList.pairList.find(
    (it) => pairResultProps.me.manitiId === it.maniti.guestId,
  )?.maniti;

  // axios
  const manitoResult: ManitoResultAnalysis = MANITO_RESULT;
  const manitiResult: ManitoResultAnalysis = MANITI_RESULT;

  const children = (
    <div className={styles.Conatiner}>
      <div className={styles.ConatinerTitle}>
        <div className={`FontMBold ${styles.MarginBottom1_5}`}>
          <span>{pairResultProps.tag === 1 ? `마니또 ${manito!.nickname}` : `마니띠 ${maniti!.nickname}`}</span>님과
          관계분석
        </div>
        <div>
          <img
            className={`${styles.ProfileResultUrl} ${styles.MarginBottom1}`}
            src={pairResultProps.tag === 1 ? manito!.profileUrl : maniti!.profileUrl}
            alt=""
          />
          <div className="FontSBold">
            우호도 {pairResultProps.tag === 1 ? manitoResult!.favorability : manitiResult!.favorability}점
          </div>
        </div>
      </div>
      <div>
        <div className={styles.Row}>
          <div className={styles.Column}>
            <div className="FontMBold">{pairResultProps.tag === 1 ? '마니또 단어' : '내 단어'}</div>
            {/* <ResultWordCloudChart /> */}
            {/* <ResultWord />  모르겠다 일단넘겨*/}
            <div>
              {pairResultProps.tag === 1 ? manitoResult!.myWordcount[0].count : manitiResult!.myWordcount[0].count}
            </div>
          </div>
          <div className={styles.Column}>
            <div className="FontMBold">{pairResultProps.tag === 1 ? '내 단어' : '마니띠 단어'}</div>
            {/* <ResultWord /> */}
            <div>
              {pairResultProps.tag === 1 ? manitoResult!.myWordcount[0].count : manitiResult!.myWordcount[0].count}
            </div>
          </div>
        </div>
        <div className={styles.Row}>
          <div className={styles.Column}>
            <div className={`${styles.MarginBottom1_5} ${styles.Column}`}>
              <div className={`FontSBold ${styles.MarginBottom1}`}>대화 빈도/횟수</div>
              {pairResultProps.tag === 1 ? (
                <ResultCountCard {...{ count: manitoResult.chatCount }} />
              ) : (
                <ResultCountCard {...{ count: manitiResult.chatCount }} />
              )}
            </div>
            <div className={`${styles.MarginBottom1_5} ${styles.Column}`}>
              <div className={`FontSBold ${styles.MarginBottom1}`}>미션 수행 횟수</div>
              {pairResultProps.tag === 1 ? (
                <ResultCountCard {...{ count: manitoResult.missionCount }} />
              ) : (
                <ResultCountCard {...{ count: manitiResult.missionCount }} />
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
              {pairResultProps.tag === 1 ? (
                <ResultDoughnutChart {...{ ratio: manitoResult.ratio }} />
              ) : (
                <ResultDoughnutChart {...{ ratio: manitiResult.ratio }} />
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

export default PairResultPage;
