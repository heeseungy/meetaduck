import { Axios } from './axios';

export async function partyStartService() {
  try {
    const response = await Axios.patch(`/api/parties`, {
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

export async function partyInfoService(partyId: number) {
  try {
    const response = await Axios.get(`api/parties/${partyId}`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}
