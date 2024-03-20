import styles from '@/styles/result/ResultCountCard.module.css';
import { ResultCountCardProps } from '@/types/result';

function ResultCountCard(resultCountCardProps: ResultCountCardProps) {
  return <div className={`FontSBold ${styles.Card}`}>{resultCountCardProps.count}회</div>;
}

export default ResultCountCard;
