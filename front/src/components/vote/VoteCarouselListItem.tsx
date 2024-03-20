import VoteCarouselItem from '@/components/vote/VoteCarouselItem';
import styles from '@/styles/vote/VoteCarouselList.module.css';
import { ListProifle } from '@/types/user.interface';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

type VoteCarouselListItemProps = {
  partyList: ListProifle[];
};

function VoteCarouselListItem(voteCarouselListProps: VoteCarouselListItemProps) {
  return (
    <div className={styles.CarouselListItem}>
      {voteCarouselListProps.partyList.map((it) => (
        <VoteCarouselItem {...it} />
      ))}
    </div>
  );
}

export default VoteCarouselListItem;
