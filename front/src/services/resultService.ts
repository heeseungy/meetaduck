import { Axios } from './axios';

export async function pairResultService(partyId: number) {
  try {
    const response = await Axios.get(`/api/guests/pairs/${partyId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getOneInfoService(guestId: number) {
  try {
    const response = await Axios.get(`/api/guests/${guestId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
