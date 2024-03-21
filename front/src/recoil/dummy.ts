import { ChatId } from '@/types/chat';
import { Answer, Hint } from '@/types/hint.ts';
import { MissionContent, MissionResultList } from '@/types/mission';
import { Party, PartyStatus, StatusType } from '@/types/party';
import { ResultListItemProps } from '@/types/result';
import { ManitoResultAnalysis, ResultAnalysis } from '@/types/result';
import { ListProfile, LoginProfile } from '@/types/user.interface';

// 로그인 시 필요한 데이터
export const MY_INFO: LoginProfile = {
  kakaoId: 123456,
  guestId: 1,
  partyId: 3,
  nickname: '가철수',
  profileUrl: 'https://image.yes24.com/goods/104804448/XL',
  thumbnailUrl: 'https://image.yes24.com/goods/104804448/XL',
};

// 파티 조회
export const PARTY1: Party = {
  partyId: 3,
  accessCode: 'tlz5vy',
  startTime: '2024-03-11T21:00:00.000Z',
  endTime: '2024-03-20T21:00:00.000Z',
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
  // status: StatusType['InProgress'],
  status: StatusType['Before24'],
  // status: StatusType['Complete'],
};

// 참가자 1명 조회
export const MY_PROFILE: ListProfile = {
  userId: 152,
  guestId: 1,
  nickname: '가철수',
  thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKxnXqmGmOaxoeLkB8eWisfFLkCuguI2ZiRQ&usqp=CAU',
  votedId: 0,
};

// 참가자 목록 조회 (시작전)
export const PARTYLIST: ListProfile[] = [
  {
    userId: 152,
    guestId: 1,
    nickname: '가철수',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKxnXqmGmOaxoeLkB8eWisfFLkCuguI2ZiRQ&usqp=CAU',
    votedId: 0,
  },
  {
    userId: 160,
    guestId: 2,
    nickname: '나철수',
    thumbnailUrl: 'https://ilyo.co.kr/contents/article/images/2017/1209/1512813041302755.jpg',
    votedId: 0,
  },
  {
    userId: 98,
    guestId: 3,
    nickname: '다철수',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0_OYPzDohuNgpalEmE87NqxTsiTdVyV-1ZQ&usqp=CAU',
    votedId: 0,
  },
  {
    userId: 111,
    guestId: 4,
    nickname: '라철수',
    thumbnailUrl: 'https://cdn.allets.com/500/2018/12/27/500_399045_1545871078.jpeg',
    votedId: 0,
  },
  {
    userId: 202,
    guestId: 5,
    nickname: '바철수',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ZRwNPdZBjdT128qQWJRi94ayDBYeGtcW2Q&usqp=CAU',
    votedId: 0,
  },
  {
    userId: 10,
    guestId: 6,
    nickname: '가영희',
    thumbnailUrl: 'https://www.sportsq.co.kr/news/photo/201505/46687_83816_428.png',
    votedId: 0,
  },
  {
    userId: 5,
    guestId: 7,
    nickname: '나영희',
    thumbnailUrl: 'https://cdn.imweb.me/thumbnail/20230824/20e7077f9429c.png',
    votedId: 0,
  },
  {
    userId: 7,
    guestId: 8,
    nickname: '다영희',
    thumbnailUrl: 'https://dimg.donga.com/wps/NEWS/IMAGE/2021/11/12/110217903.2.jpg',
    votedId: 0,
  },
  {
    userId: 12,
    guestId: 9,
    nickname: '라영희',
    thumbnailUrl: 'https://i.pinimg.com/236x/fe/40/e3/fe40e3ffbbcde74c5c77e188111ce2f7.jpg',
    votedId: 0,
  },
  {
    userId: 59,
    guestId: 10,
    nickname: '마영희',
    thumbnailUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyIru6tQLhwY8EU6OV9IemXdE6EXSEZYrc0A&usqp=CAU',
    votedId: 0,
  },
  {
    userId: 43,
    guestId: 11,
    nickname: '바영희',
    thumbnailUrl: 'https://i.ytimg.com/vi/tYM4oISacwY/maxresdefault.jpg',
    votedId: 0,
  },
];

//참가자 목록 조회 (결과)
export const PAIR_LIST: ResultListItemProps[] = [
  {
    manito: {
      guestId: 1,
      nickname: '가철수',
      profileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKxnXqmGmOaxoeLkB8eWisfFLkCuguI2ZiRQ&usqp=CAU',
      thumbnailUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKxnXqmGmOaxoeLkB8eWisfFLkCuguI2ZiRQ&usqp=CAU',
      manitiId: 2,
      votedId: 10,
      manitoFavorability: 80,
    },
    maniti: {
      guestId: 2,
      nickname: '나철수',
      profileUrl: 'https://ilyo.co.kr/contents/article/images/2017/1209/1512813041302755.jpg',
      thumbnailUrl: 'https://ilyo.co.kr/contents/article/images/2017/1209/1512813041302755.jpg',
      manitiId: 3,
      votedId: 1,
      manitoFavorability: 60,
    },
  },
  {
    manito: {
      guestId: 2,
      nickname: '나철수',
      profileUrl: 'https://ilyo.co.kr/contents/article/images/2017/1209/1512813041302755.jpg',
      thumbnailUrl: 'https://ilyo.co.kr/contents/article/images/2017/1209/1512813041302755.jpg',
      manitiId: 3,
      votedId: 1,
      manitoFavorability: 60,
    },
    maniti: {
      guestId: 3,
      nickname: '다철수',
      profileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0_OYPzDohuNgpalEmE87NqxTsiTdVyV-1ZQ&usqp=CAU',
      thumbnailUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0_OYPzDohuNgpalEmE87NqxTsiTdVyV-1ZQ&usqp=CAU',
      manitiId: 4,
      votedId: 4,
      manitoFavorability: 85,
    },
  },
  {
    manito: {
      guestId: 3,
      nickname: '다철수',
      profileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0_OYPzDohuNgpalEmE87NqxTsiTdVyV-1ZQ&usqp=CAU',
      thumbnailUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0_OYPzDohuNgpalEmE87NqxTsiTdVyV-1ZQ&usqp=CAU',
      manitiId: 4,
      votedId: 4,
      manitoFavorability: 85,
    },
    maniti: {
      guestId: 4,
      nickname: '라철수',
      profileUrl: 'https://cdn.allets.com/500/2018/12/27/500_399045_1545871078.jpeg',
      thumbnailUrl: 'https://cdn.allets.com/500/2018/12/27/500_399045_1545871078.jpeg',
      manitiId: 5,
      votedId: 3,
      manitoFavorability: 89,
    },
  },
  {
    manito: {
      guestId: 4,
      nickname: '라철수',
      profileUrl: 'https://cdn.allets.com/500/2018/12/27/500_399045_1545871078.jpeg',
      thumbnailUrl: 'https://cdn.allets.com/500/2018/12/27/500_399045_1545871078.jpeg',
      manitiId: 5,
      votedId: 3,
      manitoFavorability: 89,
    },
    maniti: {
      guestId: 5,
      nickname: '바철수',
      profileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ZRwNPdZBjdT128qQWJRi94ayDBYeGtcW2Q&usqp=CAU',
      thumbnailUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ZRwNPdZBjdT128qQWJRi94ayDBYeGtcW2Q&usqp=CAU',
      manitiId: 6,
      votedId: 4,
      manitoFavorability: 78,
    },
  },
  {
    manito: {
      guestId: 5,
      nickname: '바철수',
      profileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ZRwNPdZBjdT128qQWJRi94ayDBYeGtcW2Q&usqp=CAU',
      thumbnailUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ZRwNPdZBjdT128qQWJRi94ayDBYeGtcW2Q&usqp=CAU',
      manitiId: 6,
      votedId: 4,
      manitoFavorability: 78,
    },
    maniti: {
      guestId: 6,
      nickname: '가영희',
      profileUrl: 'https://www.sportsq.co.kr/news/photo/201505/46687_83816_428.png',
      thumbnailUrl: 'https://www.sportsq.co.kr/news/photo/201505/46687_83816_428.png',
      manitiId: 7,
      votedId: 1,
      manitoFavorability: 60,
    },
  },
  {
    manito: {
      guestId: 6,
      nickname: '가영희',
      profileUrl: 'https://www.sportsq.co.kr/news/photo/201505/46687_83816_428.png',
      thumbnailUrl: 'https://www.sportsq.co.kr/news/photo/201505/46687_83816_428.png',
      manitiId: 7,
      votedId: 1,
      manitoFavorability: 60,
    },
    maniti: {
      guestId: 7,
      nickname: '나영희',
      profileUrl: 'https://cdn.imweb.me/thumbnail/20230824/20e7077f9429c.png',
      thumbnailUrl: 'https://cdn.imweb.me/thumbnail/20230824/20e7077f9429c.png',
      manitiId: 8,
      votedId: 5,
      manitoFavorability: 77,
    },
  },
  {
    manito: {
      guestId: 7,
      nickname: '나영희',
      profileUrl: 'https://cdn.imweb.me/thumbnail/20230824/20e7077f9429c.png',
      thumbnailUrl: 'https://cdn.imweb.me/thumbnail/20230824/20e7077f9429c.png',
      manitiId: 8,
      votedId: 5,
      manitoFavorability: 77,
    },
    maniti: {
      guestId: 8,
      nickname: '다영희',
      profileUrl: 'https://dimg.donga.com/wps/NEWS/IMAGE/2021/11/12/110217903.2.jpg',
      thumbnailUrl: 'https://dimg.donga.com/wps/NEWS/IMAGE/2021/11/12/110217903.2.jpg',
      manitiId: 9,
      votedId: 9,
      manitoFavorability: 60,
    },
  },
  {
    manito: {
      guestId: 8,
      nickname: '다영희',
      profileUrl: 'https://dimg.donga.com/wps/NEWS/IMAGE/2021/11/12/110217903.2.jpg',
      thumbnailUrl: 'https://dimg.donga.com/wps/NEWS/IMAGE/2021/11/12/110217903.2.jpg',
      manitiId: 9,
      votedId: 9,
      manitoFavorability: 60,
    },
    maniti: {
      guestId: 9,
      nickname: '라영희',
      profileUrl: 'https://i.pinimg.com/236x/fe/40/e3/fe40e3ffbbcde74c5c77e188111ce2f7.jpg',
      thumbnailUrl: 'https://i.pinimg.com/236x/fe/40/e3/fe40e3ffbbcde74c5c77e188111ce2f7.jpg',
      manitiId: 10,
      votedId: 10,
      manitoFavorability: 45,
    },
  },
  {
    manito: {
      guestId: 9,
      nickname: '라영희',
      profileUrl: 'https://i.pinimg.com/236x/fe/40/e3/fe40e3ffbbcde74c5c77e188111ce2f7.jpg',
      thumbnailUrl: 'https://i.pinimg.com/236x/fe/40/e3/fe40e3ffbbcde74c5c77e188111ce2f7.jpg',
      manitiId: 10,
      votedId: 10,
      manitoFavorability: 45,
    },
    maniti: {
      guestId: 10,
      nickname: '마영희',
      profileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyIru6tQLhwY8EU6OV9IemXdE6EXSEZYrc0A&usqp=CAU',
      thumbnailUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyIru6tQLhwY8EU6OV9IemXdE6EXSEZYrc0A&usqp=CAU',
      manitiId: 11,
      votedId: 3,
      manitoFavorability: 84,
    },
  },
  {
    manito: {
      guestId: 10,
      nickname: '마영희',
      profileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyIru6tQLhwY8EU6OV9IemXdE6EXSEZYrc0A&usqp=CAU',
      thumbnailUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyIru6tQLhwY8EU6OV9IemXdE6EXSEZYrc0A&usqp=CAU',
      manitiId: 11,
      votedId: 3,
      manitoFavorability: 84,
    },
    maniti: {
      guestId: 11,
      nickname: '바영희',
      profileUrl: 'https://i.ytimg.com/vi/tYM4oISacwY/maxresdefault.jpg',
      thumbnailUrl: 'https://i.ytimg.com/vi/tYM4oISacwY/maxresdefault.jpg',
      manitiId: 1,
      votedId: 1,
      manitoFavorability: 93,
    },
  },
  {
    manito: {
      guestId: 11,
      nickname: '바영희',
      profileUrl: 'https://i.ytimg.com/vi/tYM4oISacwY/maxresdefault.jpg',
      thumbnailUrl: 'https://i.ytimg.com/vi/tYM4oISacwY/maxresdefault.jpg',
      manitiId: 1,
      votedId: 1,
      manitoFavorability: 93,
    },
    maniti: {
      guestId: 1,
      nickname: '가철수',
      profileUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKxnXqmGmOaxoeLkB8eWisfFLkCuguI2ZiRQ&usqp=CAU',
      thumbnailUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKxnXqmGmOaxoeLkB8eWisfFLkCuguI2ZiRQ&usqp=CAU',
      manitiId: 2,
      votedId: 10,
      manitoFavorability: 80,
    },
  },
];

// 미션 조회
export const MISSION_STATUS_LIST: MissionContent = {
  missionStatusId: 578,
  confirmTime: null,
  missionContent: '마니띠의 스트레스를 줄일 수 있는 작은 장난감을 선물하세요',
};

// 미션 조회 (결과)
export const MISSION_RESULT_LIST: MissionResultList = {
  manitoMission: [
    {
      guestId: 5,
      missionStatusId: 578,
      getTime: '2024-03-13T00:00:00Z',
      confirmTime: null,
      successTime: null,
      missionContent: '마니띠의 스트레스를 줄일 수 있는 작은 장난감을 선물하세요',
      missionImageUrl: null,
    },
    {
      guestId: 5,
      missionStatusId: 621,
      getTime: '2024-03-14T00:00:00Z',
      confirmTime: '2024-03-14T12:33:20Z',
      successTime: '2024-03-14T12:50:20Z',
      missionContent: '마니띠에게 본인을 잘 설명하는 키워드 1개를 알려주세요',
      missionImageUrl: 'http://example.com/mission/success/1',
    },
    {
      guestId: 5,
      missionStatusId: 616,
      getTime: '2024-03-15T00:00:00Z',
      confirmTime: '2024-03-15T16:33:20Z',
      successTime: null,
      missionContent: '마니띠에게 좋은 아침이나 좋은 밤 메시지를 보내주세요',
      missionImageUrl: null,
    },
  ],
  myMission: [
    {
      guestId: 1,
      missionStatusId: 617,
      getTime: '2024-03-13T00:00:00Z',
      confirmTime: '2024-03-13T12:33:20Z',
      successTime: '2024-03-13T16:32:48Z',
      missionContent: '마니띠의 혈액형을 작성 후, 캡쳐해주세요',
      missionImageUrl: 'http://example.com/mission/success/1',
    },
    {
      guestId: 1,
      missionStatusId: 579,
      getTime: '2024-03-14T00:00:00Z',
      confirmTime: null,
      successTime: null,
      missionContent: '마니띠에게 본인을 잘 설명하는 키워드 1개를 알려주세요',
      missionImageUrl: null,
    },
    {
      guestId: 1,
      missionStatusId: 580,
      getTime: '2024-03-15T00:00:00Z',
      confirmTime: null,
      successTime: null,
      missionContent: '마니띠에게 좋은 아침이나 좋은 밤 메시지를 보내주세요',
      missionImageUrl: null,
    },
  ],
};

// 채팅방 목록
export const CHAT_ID_LIST: ChatId = {
  groupChatId: 8,
  manitoChatId: 1,
  manitiChatId: 5,
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
  favorability: 80,
  wordcount: [
    { key: '내', value: 10 },
    { key: '밥솥', value: 8 },
    { key: '내놔', value: 7 },
  ],
  ratio: { positive: 80, negative: 10, neutral: 10 },
  missionSuccess: 2,
};

export const MY_MANITO_RESULT: ManitoResultAnalysis = {
  favorability: 60,
  wordcount: [
    { key: '넌', value: 3 },
    { key: '안경', value: 2 },
    { key: '얹어', value: 1 },
  ],
  ratio: { positive: 50, negative: 10, neutral: 40 },
  missionSuccess: 3,
};

// 대화분석 (마니띠)
export const MANITI_RESULT: ResultAnalysis = {
  favorability: 60,
  wordcount: [
    { key: '아니', value: 10 },
    { key: '진짜', value: 7 },
    { key: '세상에', value: 1 },
  ],
  ratio: { positive: 50, negative: 10, neutral: 40 },
};

export const MY_MANITI_RESULT: ResultAnalysis = {
  favorability: 80,
  wordcount: [
    { key: '아', value: 12 },
    { key: '재석이형', value: 6 },
    { key: '망했어', value: 2 },
  ],
  ratio: { positive: 80, negative: 10, neutral: 10 },
};
