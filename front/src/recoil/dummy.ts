import { ChatId } from '@/types/chat';
import { Answer, Hint } from '@/types/hint.ts';
import { MissionContent, MissionResult, MissionResultList } from '@/types/mission';
import { Party, PartyStatus, StatusType } from '@/types/party';
import { ResultListItemProps } from '@/types/result';
import { ManitoResultAnalysis, ResultAnalysis } from '@/types/result';
import { ListProfile, LoginProfile, ManitiProfile } from '@/types/user.interface';

// // 로그인 시 필요한 데이터
// export const MY_INFO: LoginProfile = {
//   kakaoId: 123456,
//   guestId: 1,
//   partyId: 3,
//   nickname: '가철수',
//   profileUrl: 'https://image.yes24.com/goods/104804448/XL',
//   thumbnailUrl: 'https://image.yes24.com/goods/104804448/XL',
//   userId: 123455,
// };

// 파티 조회
export const PARTY1: Party = {
  partyId: 1,
  accessCode: 'tlz5vy',
  partyName: '마니또도도독 너 내 동료가 되라',
  startTime: '',
  endTime: '',
  deleted: false,
  userId: 152,
};

const date1 = new Date(PARTY1.startTime);
const date2 = new Date(PARTY1.endTime);
const diffDate = date1.getTime() - date2.getTime();
export const DATE_DIFF = Math.abs(diffDate / (1000 * 60 * 60 * 24));

// 현재 파티 상태 확인
export const PARTY_STATUS: PartyStatus = {
  // status: StatusType['Todo'],
  status: StatusType['InProgress'],
  // status: StatusType['Before24']
  // status: StatusType['Complete'],
};

// 참가자 1명 조회
export const MY_PROFILE: ListProfile = {
  userId: 0,
  guestId: 0,
  nickname: '',
  thumbnailUrl: '',
  votedId: 0,
};

// 마니띠 조회
export const MANITI_PROFILE: ManitiProfile = {
  nickname: '',
};

// 참가자 목록 조회 (시작전)
export const PARTYLIST: ListProfile[] = [
  {
    guestId: 0,
    userId: 0,
    nickname: '',
    thumbnailUrl: '',
    votedId: 0,
  },
  {
    userId: 0,
    guestId: 0,
    nickname: '',
    thumbnailUrl: '',
    votedId: 0,
  },
  {
    userId: 0,
    guestId: 0,
    nickname: '',
    thumbnailUrl: '',
    votedId: 0,
  },
];

//참가자 목록 조회 (결과)
export const PAIR_LIST: ResultListItemProps[] = [
  {
    manito: {
      guestId: 1,
      nickname: '가철수',
      thumbnailUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKxnXqmGmOaxoeLkB8eWisfFLkCuguI2ZiRQ&usqp=CAU',
      manitiId: 2,
      votedId: 10,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
    maniti: {
      guestId: 2,
      nickname: '나철수',
      thumbnailUrl: 'https://ilyo.co.kr/contents/article/images/2017/1209/1512813041302755.jpg',
      manitiId: 3,
      votedId: 1,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
  },
  {
    manito: {
      guestId: 2,
      nickname: '나철수',
      thumbnailUrl: 'https://ilyo.co.kr/contents/article/images/2017/1209/1512813041302755.jpg',
      manitiId: 3,
      votedId: 1,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
    maniti: {
      guestId: 3,
      nickname: '다철수',
      thumbnailUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0_OYPzDohuNgpalEmE87NqxTsiTdVyV-1ZQ&usqp=CAU',
      manitiId: 4,
      votedId: 4,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
  },
  {
    manito: {
      guestId: 3,
      nickname: '다철수',
      thumbnailUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0_OYPzDohuNgpalEmE87NqxTsiTdVyV-1ZQ&usqp=CAU',
      manitiId: 4,
      votedId: 4,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
    maniti: {
      guestId: 4,
      nickname: '라철수',
      thumbnailUrl: 'https://cdn.allets.com/500/2018/12/27/500_399045_1545871078.jpeg',
      manitiId: 5,
      votedId: 3,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
  },
  {
    manito: {
      guestId: 4,
      nickname: '라철수',
      thumbnailUrl: 'https://cdn.allets.com/500/2018/12/27/500_399045_1545871078.jpeg',
      manitiId: 5,
      votedId: 3,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
    maniti: {
      guestId: 5,
      nickname: '바철수',
      thumbnailUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ZRwNPdZBjdT128qQWJRi94ayDBYeGtcW2Q&usqp=CAU',
      manitiId: 6,
      votedId: 4,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
  },
  {
    manito: {
      guestId: 5,
      nickname: '바철수',
      thumbnailUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ZRwNPdZBjdT128qQWJRi94ayDBYeGtcW2Q&usqp=CAU',
      manitiId: 6,
      votedId: 4,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
    maniti: {
      guestId: 6,
      nickname: '가영희',
      thumbnailUrl: 'https://www.sportsq.co.kr/news/photo/201505/46687_83816_428.png',
      manitiId: 7,
      votedId: 1,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
  },
  {
    manito: {
      guestId: 6,
      nickname: '가영희',
      thumbnailUrl: 'https://www.sportsq.co.kr/news/photo/201505/46687_83816_428.png',
      manitiId: 7,
      votedId: 1,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
    maniti: {
      guestId: 7,
      nickname: '나영희',
      thumbnailUrl: 'https://cdn.imweb.me/thumbnail/20230824/20e7077f9429c.png',
      manitiId: 8,
      votedId: 5,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
  },
  {
    manito: {
      guestId: 7,
      nickname: '나영희',
      thumbnailUrl: 'https://cdn.imweb.me/thumbnail/20230824/20e7077f9429c.png',
      manitiId: 8,
      votedId: 5,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
    maniti: {
      guestId: 8,
      nickname: '다영희',
      thumbnailUrl: 'https://dimg.donga.com/wps/NEWS/IMAGE/2021/11/12/110217903.2.jpg',
      manitiId: 9,
      votedId: 9,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
  },
  {
    manito: {
      guestId: 8,
      nickname: '다영희',
      thumbnailUrl: 'https://dimg.donga.com/wps/NEWS/IMAGE/2021/11/12/110217903.2.jpg',
      manitiId: 9,
      votedId: 9,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
    maniti: {
      guestId: 9,
      nickname: '라영희',
      thumbnailUrl: 'https://i.pinimg.com/236x/fe/40/e3/fe40e3ffbbcde74c5c77e188111ce2f7.jpg',
      manitiId: 10,
      votedId: 10,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
  },
  {
    manito: {
      guestId: 9,
      nickname: '라영희',
      thumbnailUrl: 'https://i.pinimg.com/236x/fe/40/e3/fe40e3ffbbcde74c5c77e188111ce2f7.jpg',
      manitiId: 10,
      votedId: 10,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
    maniti: {
      guestId: 10,
      nickname: '마영희',
      thumbnailUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyIru6tQLhwY8EU6OV9IemXdE6EXSEZYrc0A&usqp=CAU',
      manitiId: 11,
      votedId: 3,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
  },
  {
    manito: {
      guestId: 10,
      nickname: '마영희',
      thumbnailUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyIru6tQLhwY8EU6OV9IemXdE6EXSEZYrc0A&usqp=CAU',
      manitiId: 11,
      votedId: 3,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
    maniti: {
      guestId: 11,
      nickname: '바영희',
      thumbnailUrl: 'https://i.ytimg.com/vi/tYM4oISacwY/maxresdefault.jpg',
      manitiId: 1,
      votedId: 1,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
  },
  {
    manito: {
      guestId: 11,
      nickname: '바영희',
      thumbnailUrl: 'https://i.ytimg.com/vi/tYM4oISacwY/maxresdefault.jpg',
      manitiId: 1,
      votedId: 1,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
    maniti: {
      guestId: 1,
      nickname: '가철수',
      thumbnailUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKxnXqmGmOaxoeLkB8eWisfFLkCuguI2ZiRQ&usqp=CAU',
      manitiId: 2,
      votedId: 10,
      favorability: {
        manitoFavorability: 50,
        manitiFavorability: 52,
      },
    },
  },
];

// 미션 조회
export const MISSION_STATUS_LIST: MissionContent[] = [
  {
    missionStatusId: 0,
    confirmTime: '',
    missionImageUrl: null,
    missionContent: '',
  },
];

//미션: 마니또가 수행한 미션조회
export const MY_MANITO_MISSION: MissionResult = {
  missionStatusId: 0,
  getTime: '',
  confirmTime: null,
  successTime: null,
  failedTime: null,
  missionContent: '',
  missionImageUrl: '',
};

// 미션 조회 (결과)
export const MISSION_RESULT_LIST: MissionResultList = {
  manitoMission: [
    {
      missionStatusId: 1,
      getTime: '0',
      confirmTime: null,
      failedTime: null,
      successTime: null,
      missionContent: '',
      missionImageUrl: null,
    },
  ],
  myMission: [
    {
      missionStatusId: 617,
      getTime: '0',
      confirmTime: null,
      failedTime: null,
      successTime: null,
      missionContent: '',
      missionImageUrl: null,
    },
  ],
};

// 채팅방 목록
export const CHAT_ID_LIST: ChatId = {
  groupChatId: 5,
  manitoChatId: 1,
  manitiChatId: 8,
};

// 힌트 질문 (입력페이지용)
export const HINT_QUESTION: Hint[] = [
  { hintId: 3, hintContent: '최근에 본 가장 인상 깊은 영화는 무엇인가요?' },
  { hintId: 25, hintContent: '강아지 vs 고양이?' },
  { hintId: 75, hintContent: '여행가고 싶은 나라는 어디인가요?' },
  { hintId: 101, hintContent: '토맛토마토 vs 토마토맛토' },
  { hintId: 20, hintContent: '가장 좋아하는 음료는 무엇인가요?' },
  { hintId: 47, hintContent: '가장 최근에 들은 노래는 무엇인가요?' },
  { hintId: 6, hintContent: '제일 좋아하는 색은 무엇인가요?' },
];
// 힌트 질문 답 (미션성공)
export const HINT_NONE: Answer[] = [];

// 힌트 질문 답 (미션실패)
export const HINT_PART: Answer[] = [
  { hintId: 3, hintContent: '최근에 본 가장 인상 깊은 영화는 무엇인가요?', hintStatusAnswer: '윙카' },
  { hintId: 25, hintContent: '강아지 vs 고양이?', hintStatusAnswer: '고양이' },
  { hintId: 75, hintContent: '여행가고 싶은 나라는 어디인가요?', hintStatusAnswer: '미국' },
];

// 힌트 질문 답 (종료)
export const HINT_ALL: Answer[] = [
  { hintId: 3, hintContent: '최근에 본 가장 인상 깊은 영화는 무엇인가요?', hintStatusAnswer: '윙카' },
  { hintId: 25, hintContent: '강아지 vs 고양이?', hintStatusAnswer: '고양이' },
  { hintId: 75, hintContent: '여행가고 싶은 나라는 어디인가요?', hintStatusAnswer: '미국' },
  { hintId: 101, hintContent: '토맛토마토 vs 토마토맛토', hintStatusAnswer: '토맛토마토' },
  {
    hintId: 20,
    hintContent: '가장 좋아하는 음료는 무엇인가요?',
    hintStatusAnswer: '아메아메아메아메아메아메아메아메아메리카노~',
  },
  { hintId: 47, hintContent: '가장 최근에 들은 노래는 무엇인가요?', hintStatusAnswer: '출사표' },
  { hintId: 6, hintContent: '제일 좋아하는 색은 무엇인가요?', hintStatusAnswer: '그레이' },
];

// 대화분석 (마니또)
export const MANITO_RESULT: ManitoResultAnalysis = {
  favorability: 50,
  ratio: 44,
  myWordcount: [
    {
      count: 8,
      word: '있어',
    },
    {
      count: 7,
      word: '오늘',
    },
    {
      count: 7,
      word: '음악',
    },
    {
      count: 6,
      word: '뭐',
    },
    {
      count: 6,
      word: '집',
    },
    {
      count: 8,
      word: '바보',
    },
    {
      count: 7,
      word: '뭐야',
    },
    {
      count: 7,
      word: '밥',
    },
    {
      count: 6,
      word: '커피',
    },
    {
      count: 6,
      word: '집',
    },
    {
      count: 5,
      word: '나',
    },
    {
      count: 5,
      word: '나도',
    },
    {
      count: 5,
      word: '너',
    },
    {
      count: 5,
      word: '듣고',
    },
    {
      count: 4,
      word: '안녕하세요',
    },
    {
      count: 4,
      word: '요리',
    },
    {
      count: 4,
      word: '좋아',
    },
    {
      count: 4,
      word: '좋아해',
    },
    {
      count: 4,
      word: '하고',
    },
    {
      count: 3,
      word: '계획',
    },
    {
      count: 4,
      word: '요리',
    },
    {
      count: 4,
      word: '좋아',
    },
    {
      count: 4,
      word: '좋아해',
    },
    {
      count: 4,
      word: '하고',
    },
    {
      count: 3,
      word: '계획',
    },
  ],
  wordcount: [
    {
      count: 9,
      word: '있어',
    },
    {
      count: 6,
      word: '나도',
    },
    {
      count: 6,
      word: '좋아해',
    },
    {
      count: 5,
      word: '어떤',
    },
    {
      count: 5,
      word: '요리',
    },
    {
      count: 5,
      word: '음악',
    },
    {
      count: 5,
      word: '좋아',
    },
    {
      count: 5,
      word: '집',
    },
    {
      count: 4,
      word: '나',
    },
    {
      count: 4,
      word: '너',
    },
    {
      count: 4,
      word: '듣고',
    },
    {
      count: 4,
      word: '정말',
    },
    {
      count: 3,
      word: '계획',
    },
    {
      count: 3,
      word: '곡',
    },
    {
      count: 3,
      word: '그래',
    },
  ],
  chatCount: 139,
  missionCount: 0,
};

// 대화분석 (마니띠)
export const MANITI_RESULT: ManitoResultAnalysis = {
  favorability: 50,
  ratio: 44,
  myWordcount: [
    {
      count: 8,
      word: '있어',
    },
    {
      count: 7,
      word: '오늘',
    },
    {
      count: 7,
      word: '음악',
    },
    {
      count: 6,
      word: '뭐',
    },
    {
      count: 6,
      word: '집',
    },
    {
      count: 5,
      word: '나',
    },
    {
      count: 5,
      word: '나도',
    },
    {
      count: 5,
      word: '너',
    },
    {
      count: 5,
      word: '듣고',
    },
    {
      count: 4,
      word: '안녕하세요',
    },
    {
      count: 4,
      word: '요리',
    },
    {
      count: 4,
      word: '좋아',
    },
    {
      count: 4,
      word: '좋아해',
    },
    {
      count: 4,
      word: '하고',
    },
    {
      count: 3,
      word: '계획',
    },
  ],
  wordcount: [
    {
      count: 9,
      word: '있어',
    },
    {
      count: 6,
      word: '나도',
    },
    {
      count: 6,
      word: '좋아해',
    },
    {
      count: 5,
      word: '어떤',
    },
    {
      count: 5,
      word: '요리',
    },
    {
      count: 5,
      word: '음악',
    },
    {
      count: 5,
      word: '좋아',
    },
    {
      count: 5,
      word: '집',
    },
    {
      count: 4,
      word: '나',
    },
    {
      count: 4,
      word: '너',
    },
    {
      count: 4,
      word: '듣고',
    },
    {
      count: 4,
      word: '정말',
    },
    {
      count: 3,
      word: '계획',
    },
    {
      count: 3,
      word: '곡',
    },
    {
      count: 3,
      word: '그래',
    },
  ],
  chatCount: 139,
  missionCount: 0,
};
