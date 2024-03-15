import Card from '@/components/commons/Card';
import ResultList from '@/components/result/ResultList';
import styles from '@/styles/result/ResultPage.module.css';
import { ResultListProps } from '@/types/result';
import { PairRank } from '@/types/user.interface';

type A2401Props = {
  me: PairRank;
  pairList: ResultListProps;
};
function A2401(a2401Props: A2401Props) {
  const myManito = a2401Props.pairList.pairList.find((it) => it.manito.manitiId === a2401Props.me.guestId)?.manito;
  // console.log(myManito!.nickname);

  const children = (
    <div>
      <div className={`${styles.Title}`}>
        <div className={`FontMTitle`}>나의 마니또는 {myManito!.nickname}입니다</div>
        <div className={`${styles.SubTitles}`}>
          <div className="FontS">마니또 발표</div>
          <div className={`FontS ${styles.SubTitle}`}>
            <div>마니또</div>
            <div>마니띠</div>
          </div>
        </div>
      </div>
      <div className={styles.ScrollConatiner}>
        <ResultList {...a2401Props.pairList} />
      </div>
    </div>
  );
  return (
    <>
      <img className={styles.ProfileUrl} src={myManito!.profileUrl} alt="profileImage" />
      <Card {...{ tag: 3, children: children }} />
    </>
  );
}

export default A2401;
