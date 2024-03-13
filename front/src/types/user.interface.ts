// 프로필
export interface Profile {
  guestId: number;
  nickname: string;
  profileUrl: string;
  thumbnailUrl: string;
}

// 마니또 페어
export interface PairRank extends Profile {
  manittiId: number;
  votedId: number;
  manitoFavorability: number;
}
