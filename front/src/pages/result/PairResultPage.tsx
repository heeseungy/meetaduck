import missionAfter from '@/assets/images/missionAfter.png';
import Card from '@/components/commons/Card';
import ResultCountCard from '@/components/result/ResultCountCard';
import ResultDoughnutChart from '@/components/result/ResultDoughnutChart';
import WordCloud from '@/components/result/WordCloud';
import styles from '@/styles/result/ResultPage.module.css';
import { ManitoResultAnalysis, ResultListProps } from '@/types/result';
import { PairRank } from '@/types/user.interface';

// tag: 1: 첫번째 2: 두번째
type PairResultProps = {
  tag: number;
  me: PairRank;
  pairList: ResultListProps;
  analysis: ManitoResultAnalysis;
};

function PairResultPage(pairResultProps: PairResultProps) {
  const manito = pairResultProps.pairList.pairList.find(
    (it) => it.manito.manitiId === pairResultProps.me.guestId,
  )?.manito;
  const maniti = pairResultProps.pairList.pairList.find(
    (it) => pairResultProps.me.manitiId === it.maniti.guestId,
  )?.maniti;

  const result: ManitoResultAnalysis = pairResultProps.analysis;

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
            src={pairResultProps.tag === 1 ? manito!.thumbnailUrl : maniti!.thumbnailUrl}
            alt=""
          />
          <div className="FontSBold">우호도 {result!.favorability}점</div>
        </div>
      </div>
      <div>
        <div className={styles.Row}>
          <div className={styles.Column}>
            <div className={`FontMBold ${styles.MarginBottom1_5}`}>
              {pairResultProps.tag === 1 ? '마니또 단어' : '내 단어'}
            </div>
            {pairResultProps.tag === 1 ? (
              result.wordcount.length > 0 ? (
                <div className={styles.WordCloud}>
                  <WordCloud {...{ width: 130, height: 100, data: result.wordcount }} />
                </div>
              ) : (
                <div className={`FontXS FontBasic ${styles.NoData} ${styles.Word}`}>
                  <div>분석할 데이터가 없어요😥</div>
                </div>
              )
            ) : result.myWordcount.length > 0 ? (
              <div className={styles.WordCloud}>
                <WordCloud {...{ width: 130, height: 100, data: result.myWordcount }} />
              </div>
            ) : (
              <div className={`FontXS FontBasic ${styles.NoData} ${styles.Word}`}>
                <div>분석할 데이터가 없어요😥</div>
              </div>
            )}
          </div>
          <div className={styles.Column}>
            <div className={`FontMBold ${styles.MarginBottom1_5}`}>
              {pairResultProps.tag === 1 ? '내 단어' : '마니띠 단어'}
            </div>
            {pairResultProps.tag === 1 ? (
              result.myWordcount.length > 0 ? (
                <div className={styles.WordCloud}>
                  <WordCloud {...{ width: 130, height: 100, data: result.myWordcount }} />
                </div>
              ) : (
                <div className={`FontXS FontBasic ${styles.NoData} ${styles.Word}`}>
                  <div>분석할 데이터가 없어요😥</div>
                </div>
              )
            ) : result.wordcount.length > 0 ? (
              <div className={styles.WordCloud}>
                <WordCloud {...{ width: 130, height: 100, data: result.wordcount }} />
              </div>
            ) : (
              <div className={`FontXS FontBasic ${styles.NoData} ${styles.Word}`}>
                <div>분석할 데이터가 없어요😥</div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.Row}>
          <div className={styles.Column}>
            <div className={`${styles.MarginBottom1_5} ${styles.Column}`}>
              <div className={`FontSBold ${styles.MarginBottom1}`}>대화 횟수</div>
              <ResultCountCard {...{ count: result.chatCount }} />
            </div>
            <div className={`${styles.MarginBottom1_5} ${styles.Column}`}>
              <div className={`FontSBold ${styles.MarginBottom1}`}>미션 수행 횟수</div>
              <ResultCountCard {...{ count: result.missionCount }} />
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
              {result.ratio === -1 ? (
                <div className={`FontXS FontBasic ${styles.NoData} ${styles.Chart}`}>
                  <div>분석할 데이터가 없어요😥</div>
                </div>
              ) : (
                <ResultDoughnutChart {...{ ratio: result.ratio }} />
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
