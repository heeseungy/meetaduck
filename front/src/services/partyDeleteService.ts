import { Axios } from './axios';

export async function partyDeleteervice() {
  try {
    const response = await Axios.delete(`/api/parties`, {
      // params: {
      //   accessCode: ,
      //   endTime: ,
      //   userId: ,
      // }
    });
    // console.log(response);
  } catch (err) {
    console.log(err);
  }
}

export async function partyLeaveService(guestId: number) {
  try {
    const response = await Axios.delete(`/api/guests/${guestId}`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}
