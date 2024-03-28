import { Axios } from './axios';

export async function chatIdListService(guestId: number) {
  try {
    const response = await Axios.get(`/api/chats/${guestId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
