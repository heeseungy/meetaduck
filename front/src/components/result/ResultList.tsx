import { ResultListProps } from '@/types/result';

import ResultListItem from './ResultListItem';

function ResultList(resultListProps: ResultListProps) {
  return (
    <div>
      {resultListProps.pairList.map((it) => (
        <ResultListItem key={it.manito.guestId} {...it} />
      ))}
    </div>
  );
}

export default ResultList;
