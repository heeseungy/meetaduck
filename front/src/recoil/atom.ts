import { atom } from "recoil";
import { LoginProfile } from '@/types/user.interface';
import { Party } from "@/types/party";

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
  }
})

export const partyState = atom<Party>({
  key: 'partyState',
  default: {
    partyId: -1,
    accessCode: '',
    startTime: '',
    endTime: '',
    deleted: false,
    userId: -1,
  }
});


// export const MY_INFO: LoginProfile = {
//   kakaoId: 123456,
//   guestId: 1,
//   partyId: 3,
//   nickname: '가철수',
//   profileUrl: 'https://image.yes24.com/goods/104804448/XL',
//   thumbnailUrl: 'https://image.yes24.com/goods/104804448/XL',
// };