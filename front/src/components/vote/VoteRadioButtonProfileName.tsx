import styles from '@/styles/vote/VoteRadioButton.module.css';

import { SimpleProfile } from './../../types/user.interface';

function VoteRadioButtonProfileName(voteRadioButtonProfileNameProps: SimpleProfile) {
  return (
    <div className={`${styles.FlexHorizontal} ${styles.Gap07rem}`}>
      <img className={styles.Thumbnail} src={voteRadioButtonProfileNameProps.thumbnailUrl} alt="" />
      <div className={`FontSTitle`}>{voteRadioButtonProfileNameProps.nickname}</div>
    </div>
  );
}

export default VoteRadioButtonProfileName;
