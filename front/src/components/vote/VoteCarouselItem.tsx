import styles from '@/styles/vote/VoteCarouselList.module.css';
import { ListProifle } from '@/types/user.interface';

function VoteCarouselItem(voteCarouselItemProps: ListProifle) {
  return (
    <div className={`FontBasic ${styles.CarouselItem}`}>
      <img className={styles.ProfileImage} src={voteCarouselItemProps.thumbnailUrl} alt="" />
      <div className="FontSBold">{voteCarouselItemProps.nickname}</div>
    </div>
  );
}

export default VoteCarouselItem;
