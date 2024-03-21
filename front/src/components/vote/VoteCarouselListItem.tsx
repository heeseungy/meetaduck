import VoteCarouselItem from '@/components/vote/VoteCarouselItem';
import { ListProfile } from '@/types/user.interface';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

import Carousel from '../commons/Carousel';

type VoteCarouselListItemProps = {
  partyList: ListProfile[];
};

function VoteCarouselListItem(voteCarouselListProps: VoteCarouselListItemProps) {
  return (
    <Carousel>
      {voteCarouselListProps.partyList.map((it, i) => (
        <VoteCarouselItem key={i} {...it} />
      ))}
    </Carousel>
  );
}

export default VoteCarouselListItem;
