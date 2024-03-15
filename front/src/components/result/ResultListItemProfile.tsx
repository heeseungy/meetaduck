import styles from '@/styles/result/ResultListItemProfile.module.css';
import { ResultListItemProfileProps } from '@/types/result';

function ResultListItemProfile(resultListItemProfileProps: ResultListItemProfileProps) {
  ///// default 값

  return (
    <div className={styles.Container}>
      <img className={styles.Avatar} src={resultListItemProfileProps.thumbnailUrl} alt="pthumbnail" />
      <div className="FontXS">{resultListItemProfileProps.nickname}</div>
    </div>
  );
}

export default ResultListItemProfile;
