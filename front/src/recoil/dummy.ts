import { Answer } from '@/types/hint.ts';
import { Party, PartyStatus, StatusType } from '@/types/party';
import { ResultListItemProps } from '@/types/result';
import { ManitoResultAnalysis, ResultAnalysis, ResultListProps } from '@/types/result';
import { ListProifle, PairRank, Profile, SimpleProfile } from '@/types/user.interface';

// 파티 조회
export const PARTY1: Party = {
  partyId: 3,
  accessCode: 'tlz5vy',
  startTime: '2024-03-11T21:00:00.000Z',
  endTime: '2024-03-20T21:00:00.000Z',
  deleted: false,
  userId: 152,
};

// 참가자 1명 조회
export const MY_PROFILE: SimpleProfile = {
  nickname: '가철수',
  thumbnailUrl: 'https://image.yes24.com/goods/104804448/XL',
};

// 참가자 목록 조회 (시작전)
export const PARYTLIST: ListProifle[] = [
  {
    userId: 152,
    guestId: 1,
    nickname: '가철수',
    thumbnailUrl: 'https://image.yes24.com/goods/104804448/XL',
  },
  {
    userId: 160,
    guestId: 2,
    nickname: '나철수',
    thumbnailUrl: 'https://www.ccbk.co.kr/m/static/images/brand/img_cokeIcon6.png',
  },
  {
    userId: 98,
    guestId: 3,
    nickname: '다철수',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqq_j6k9-8tSG6E7nBFktW0Yu7hTawMozcA&usqp=CAU',
  },
  {
    userId: 202,
    guestId: 5,
    nickname: '바철수',
    thumbnailUrl:
      'https://i.namu.wiki/i/geGngQMnvmK2g3wuKU4O1uNs8Ix1HXQULk9PrnT57lHOlU4AxL9qsNCYXOOY9DIqPWtXnphq8G6NzCcvzv-ppQ.webp',
  },
];

//참가자 목록 조회 (결과)
export const PAIR_LIST: ResultListItemProps[] = [
  {
    manito: {
      guestId: 3,
      nickname: '다철수',
      profileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqq_j6k9-8tSG6E7nBFktW0Yu7hTawMozcA&usqp=CAU',
      thumbnailUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqq_j6k9-8tSG6E7nBFktW0Yu7hTawMozcA&usqp=CAU',
      manitiId: 5,
      votedId: 5,
      manitoFavorability: 80,
    },
    maniti: {
      guestId: 5,
      nickname: '바철수',
      profileUrl:
        'https://i.namu.wiki/i/geGngQMnvmK2g3wuKU4O1uNs8Ix1HXQULk9PrnT57lHOlU4AxL9qsNCYXOOY9DIqPWtXnphq8G6NzCcvzv-ppQ.webp',
      thumbnailUrl:
        'https://i.namu.wiki/i/geGngQMnvmK2g3wuKU4O1uNs8Ix1HXQULk9PrnT57lHOlU4AxL9qsNCYXOOY9DIqPWtXnphq8G6NzCcvzv-ppQ.webp',
      manitiId: 1,
      votedId: 2,
      manitoFavorability: 60,
    },
  },
  {
    manito: {
      guestId: 5,
      nickname: '바철수',
      profileUrl:
        'https://i.namu.wiki/i/geGngQMnvmK2g3wuKU4O1uNs8Ix1HXQULk9PrnT57lHOlU4AxL9qsNCYXOOY9DIqPWtXnphq8G6NzCcvzv-ppQ.webp',
      thumbnailUrl:
        'https://i.namu.wiki/i/geGngQMnvmK2g3wuKU4O1uNs8Ix1HXQULk9PrnT57lHOlU4AxL9qsNCYXOOY9DIqPWtXnphq8G6NzCcvzv-ppQ.webp',
      manitiId: 1,
      votedId: 2,
      manitoFavorability: 60,
    },
    maniti: {
      guestId: 1,
      nickname: '가철수',
      profileUrl: 'https://image.yes24.com/goods/104804448/XL',
      thumbnailUrl: 'https://image.yes24.com/goods/104804448/XL',
      manitiId: 2,
      votedId: 2,
      manitoFavorability: 70,
    },
  },
  {
    manito: {
      guestId: 1,
      nickname: '가철수',
      profileUrl: 'https://image.yes24.com/goods/104804448/XL',
      thumbnailUrl: 'https://image.yes24.com/goods/104804448/XL',
      manitiId: 2,
      votedId: 2,
      manitoFavorability: 70,
    },
    maniti: {
      guestId: 2,
      nickname: '나철수',
      profileUrl: 'https://www.ccbk.co.kr/m/static/images/brand/img_cokeIcon6.png',
      thumbnailUrl: 'https://www.ccbk.co.kr/m/static/images/brand/img_cokeIcon6.png',
      manitiId: 3,
      votedId: 1,
      manitoFavorability: 100,
    },
  },
  {
    manito: {
      guestId: 2,
      nickname: '나철수',
      profileUrl: 'https://www.ccbk.co.kr/m/static/images/brand/img_cokeIcon6.png',
      thumbnailUrl: 'https://www.ccbk.co.kr/m/static/images/brand/img_cokeIcon6.png',
      manitiId: 3,
      votedId: 1,
      manitoFavorability: 100,
    },
    maniti: {
      guestId: 3,
      nickname: '다철수',
      profileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqq_j6k9-8tSG6E7nBFktW0Yu7hTawMozcA&usqp=CAU',
      thumbnailUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKqq_j6k9-8tSG6E7nBFktW0Yu7hTawMozcA&usqp=CAU',
      manitiId: 5,
      votedId: 5,
      manitoFavorability: 80,
    },
  },
];

// 미션 조회
// export const MISSION_STATUS_LIST:

// 미션 조회 (결과)

// 힌트 질문 (입력페이지용)

// 힌트 질문 답 (미션성공)
export const HINT_NONE: Answer[] = [];

// 힌트 질문 답 (미션실패)
export const HINT_PART: Answer[] = [
  {
    hintId: 3,
    hintContent: '최근에 본 가장 인상 깊은 영화는 무엇인가요?',
    hintStatusAnswer: '윙카',
  },
  { hintId: 25, hintContent: '강아지 vs 고양이?', hintStatusAnswer: '고양이' },
];

// 힌트 질문 답 (종료)
export const HINT_ALL: Answer[] = [
  {
    hintId: 3,
    hintContent: '최근에 본 가장 인상 깊은 영화는 무엇인가요?',
    hintStatusAnswer: '윙카',
  },
  { hintId: 25, hintContent: '강아지 vs 고양이?', hintStatusAnswer: '고양이' },
  { hintId: 25, hintContent: '강아지 vs 고양이?', hintStatusAnswer: '고양이' },
  { hintId: 25, hintContent: '강아지 vs 고양이?', hintStatusAnswer: '고양이' },
  { hintId: 25, hintContent: '강아지 vs 고양이?', hintStatusAnswer: '고양이' },
  { hintId: 25, hintContent: '강아지 vs 고양이?', hintStatusAnswer: '고양이' },
  { hintId: 25, hintContent: '강아지 vs 고양이?', hintStatusAnswer: '고양이' },
];
// 대화분석 (마니또)
export const MANITO_RESULT: ManitoResultAnalysis = {
  favorability: 60,
  wordcount: 'wordCount',
  ratio: { positive: 80, negative: 10, neutral: 10 },
  missionSuccess: 2,
};

export const MY_MANITO_RESULT: ManitoResultAnalysis = {
  favorability: 100,
  wordcount: 'wordCount',
  ratio: { positive: 50, negative: 10, neutral: 40 },
  missionSuccess: 3,
};

// 대화분석 (마니띠)
export const MANITI_RESULT: ResultAnalysis = {
  favorability: 100,
  wordcount: 'wordCount',
  ratio: { positive: 50, negative: 10, neutral: 40 },
};

export const MY_MANITI_RESULT: ResultAnalysis = {
  favorability: 60,
  wordcount: 'wordCount',
  ratio: { positive: 80, negative: 10, neutral: 10 },
};

// 참가자 1명 조회 (결과)
export const MY_INFO: PairRank = {
  guestId: 1,
  nickname: '가철수',
  profileUrl: 'https://image.yes24.com/goods/104804448/XL',
  thumbnailUrl: 'https://image.yes24.com/goods/104804448/XL',
  manitiId: 2,
  votedId: 2,
  manitoFavorability: 70,
};
