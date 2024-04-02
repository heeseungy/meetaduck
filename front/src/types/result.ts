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
  ratio: number;
};

export type WordType = {
  word: string;
  count: number;
};

export type ResultCountCardProps = {
  count: number;
};

export interface ManitoResultAnalysis {
  favorability: number;
  ratio: number;
  myWordcount: WordType[];
  wordcount: WordType[];
  chatCount: number;
  missionCount: number;
}
