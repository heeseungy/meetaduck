import { ChatId } from '@/types/chat';
import { Party, PartyStatus, StatusType } from '@/types/party';
import { LoginProfile } from '@/types/user.interface';
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'sessionStorage',
  storage: sessionStorage,
});

export const loginState = atom<LoginProfile>({
  key: 'loginState',
  default: {
    kakaoId: 123456,
    guestId: 1,
    partyId: 3,
    nickname: '가철수',
    profileUrl: 'https://image.yes24.com/goods/104804448/XL',
    thumbnailUrl: 'https://image.yes24.com/goods/104804448/XL',
    userId: 123455,
    // kakaoId: 0,
    // guestId: 0,
    // partyId: 0,
    // nickname: '',
    // profileUrl: '',
    // thumbnailUrl: '',
    // userId: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const partyState = atom<Party>({
  key: 'partyState',
  default: {
    partyId: 3,
    accessCode: 'tlz5vy',
    startTime: '2024-03-11T21:00:00.000Z',
    endTime: '2024-03-25T21:00:00.000Z',
    deleted: false,
    userId: 152,
    // partyId: -1,
    // accessCode: '',
    // startTime: '',
    // endTime: '',
    // deleted: false,
    // userId: -1,
  },
  effects_UNSTABLE: [persistAtom],
});

export const currentTimeState = atom<string>({
  key: 'currentTimeState',
  default: '',
}); // new Date()

export const partyStatusState = selector({
  key: 'partyStatusState',
  get: ({ get }) => {
    const party = get(partyState);
    const date2 = party.endTime;
    const now = get(currentTimeState);

    if (date2 === '') {
      return 'Todo';
    } else {
      const endTime = new Date(date2);
      const currentTime = new Date(now);
      const before24Time = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);

      if (currentTime < before24Time) {
        return 'InProgress';
      } else if (currentTime < endTime) {
        return 'Before24';
      } else {
        return 'Complete';
      }
    }
  },
});

export const chatIdListState = atom<ChatId>({
  key: 'chatIdListState',
  default: {
    groupChatId: 8,
    manitoChatId: 1,
    manitiChatId: 5,
    // groupChatId: ,
    // manitoChatId: ,
    // manitiChatId: ,
  },
});
