import { Axios } from './axios';

export async function chatIdListService(partyId: number) {
  try {
    const response = await Axios.get(`/api/chats/${partyId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
