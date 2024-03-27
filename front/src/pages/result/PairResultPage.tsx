import { useEffect } from 'react';

import Card from '@/components/commons/Card';
import ResultCountCard from '@/components/result/ResultCountCard';
import ResultDoughnutChart from '@/components/result/ResultDoughnutChart';
import WordCloud from '@/components/result/WordCloud';
// import ResultWordCloudChart from '@/components/result/resultWordCloud';
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
            src={pairResultProps.tag === 1 ? manito!.profileUrl : maniti!.profileUrl}
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
            <div className={styles.WordCloud}>
              {pairResultProps.tag === 1 ? (
                <WordCloud {...{ width: 130, height: 100, data: result.wordcount }} />
              ) : (
                <WordCloud {...{ width: 130, height: 100, data: result.myWordcount }} />
              )}
            </div>
          </div>
          <div className={styles.Column}>
            <div className={`FontMBold ${styles.MarginBottom1_5}`}>
              {pairResultProps.tag === 1 ? '내 단어' : '마니띠 단어'}
            </div>
            <div className={styles.WordCloud}>
              {pairResultProps.tag === 1 ? (
                <WordCloud {...{ width: 130, height: 70, data: result.myWordcount }} />
              ) : (
                <WordCloud {...{ width: 130, height: 70, data: result.wordcount }} />
              )}
            </div>
          </div>
        </div>
        <div className={styles.Row}>
          <div className={styles.Column}>
            <div className={`${styles.MarginBottom1_5} ${styles.Column}`}>
              <div className={`FontSBold ${styles.MarginBottom1}`}>대화 빈도/횟수</div>
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
              <ResultDoughnutChart {...{ ratio: result.ratio }} />
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
