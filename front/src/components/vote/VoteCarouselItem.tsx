import styles from '@/styles/vote/VoteCarouselList.module.css';
import { ListProfile } from '@/types/user.interface';

function VoteCarouselItem(voteCarouselItemProps: ListProfile) {
  return (
    <>
      <div className={`FontBasic ${styles.CarouselItem}`}>
        <img className={styles.ProfileImage} src={voteCarouselItemProps.thumbnailUrl} alt="" />
        <div className="FontSBold">{voteCarouselItemProps.nickname}</div>
      </div>
    </>
  );
}

export default VoteCarouselItem;
