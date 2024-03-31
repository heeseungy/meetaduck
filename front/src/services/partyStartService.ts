import { Axios } from './axios';

export async function partyInfoService(partyId: number) {
  try {
    const response = await Axios.get(`api/parties/${partyId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
      },
    });
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}
