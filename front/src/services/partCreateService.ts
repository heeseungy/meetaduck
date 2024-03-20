import { Axios } from './axios';

export async function partyCreateService() {
  try {
    const response = await Axios.post(`/api/parties`, {
      // params: {
      //   userId: ,
      //   partyName: ,
      // }
    });
    // console.log(response);
  } catch (err) {
    console.log(err);
  }
}
