import { PairRank } from '@/types/user.interface';

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

export type ResultDoughnutChartProps = {
  positive: number;
  negative: number;
  neutral: number;
};
export type ResultAnalysis = {
  favorability: number;
  wordcount: string;
  ratio: ResultDoughnutChartProps;
};

export type ResultCountCardProps = {
  count: number;
};
