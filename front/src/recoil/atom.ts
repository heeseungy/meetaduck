import { ChatId } from '@/types/chat';
import { Party } from '@/types/party';
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
    kakaoId: 0,
    guestId: 0,
    partyId: 0,
    nickname: '',
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
  default: '2020-03-30T16:30:27Z',
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
      // const endTime = new Date(date2);
      const endTime = new Date(new Date(date2).getTime() - 9 * 60 * 60 * 1000);
      console.log('end time ', endTime);
      const currentTime = new Date(now);
      // const currentTime = new Date(new Date(now).getTime() + 100 * 60 * 60 * 1000);
      // const before24Time = new Date(endTime.getTime() - 24 * 60 * 60 * 1000);
      const before24Time = new Date(endTime.getTime() - 4 * 60 * 1000); //종료 10분전
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
    groupChatId: 0,
    manitoChatId: 0,
    manitiChatId: 0,
  },
  effects_UNSTABLE: [persistAtom],
});
