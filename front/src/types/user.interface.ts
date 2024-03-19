//1명 조회
export interface SimpleProfile {
  nickname: string;
  thumbnailUrl: string;
}

// 프로필
export interface Profile extends SimpleProfile {
  guestId: number;
  profileUrl: string;
}

// 마니또 페어
export interface PairRank extends Profile {
  manitiId: number;
  votedId: number;
  manitoFavorability: number;
}

// 목록조회용 프로필
export interface ListProifle {
  guestId: number;
  userId: number;
  nickname: string;
  thumbnailUrl: string;
}
