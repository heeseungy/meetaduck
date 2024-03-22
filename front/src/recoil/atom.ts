import { atom } from "recoil";
import { ListProfile, LoginProfile } from '@/types/user.interface';


export const loginState = atom<LoginProfile>({
  key: 'loginState',
  default: {
    kakaoId: 0,
    guestId: 0,
    partyId: 0,
    nickname: '',
    profileUrl: '',
    thumbnailUrl: '',
  }
})




// export const MY_INFO: LoginProfile = {
//   kakaoId: 123456,
//   guestId: 1,
//   partyId: 3,
//   nickname: '가철수',
//   profileUrl: 'https://image.yes24.com/goods/104804448/XL',
//   thumbnailUrl: 'https://image.yes24.com/goods/104804448/XL',
// };