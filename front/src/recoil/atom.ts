import { ChatId } from '@/types/chat';
import { Party, PartyStatus, StatusType } from '@/types/party';
import { LoginProfile } from '@/types/user.interface';
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { CHAT_ID_LIST, PARTY1 } from './dummy';

const { persistAtom } = recoilPersist({
  key: 'sessionStorage',
  storage: sessionStorage,
});

export const loginState = atom<LoginProfile>({
  key: 'loginState',
  default: {
    // kakaoId: 0,
    // guestId: 0,
    // partyId: 0,
    kakaoId: 123456,
    guestId: 15,
    partyId: 3,
    nickname: '가철수',
    profileUrl: '',
    thumbnailUrl: '',
    userId: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const partyState = atom<Party>({
  key: 'partyState',
  default: {
    partyId: 0,
    accessCode: '',
    partyName: '',
    startTime: '',
    endTime: '',
    deleted: false,
    userId: 0,
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
  default: CHAT_ID_LIST,
});
