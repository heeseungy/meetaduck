import { PairRank, Profile } from '@/types/user.interface';

export type ResultListItemProfileProps = {
  nickname: string;
  thumbnailUrl: string;
};

export type ResultListItemProps = {
  manito: PairRank;
  maniti: PairRank;
};

export type ResultListProps = {
  pairList: ResultListItemProps[];
};

export type ResultAnalysis = {
  favorability: number;
  wordcount: string;
  ratio: number;
};
