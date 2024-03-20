import { ListProifle } from '@/types/user.interface';

import VoteCarouselListItem from './VoteCarouselListItem';

type VoteCarouselListProps = {
  partyList: ListProifle[];
};
function VoteCarouselList(voteCarouselListProps: VoteCarouselListProps) {
  return (
    <>
      <VoteCarouselListItem {...voteCarouselListProps} />
      <VoteCarouselListItem {...voteCarouselListProps} />
      <VoteCarouselListItem {...voteCarouselListProps} />
    </>
  );
}

export default VoteCarouselList;
