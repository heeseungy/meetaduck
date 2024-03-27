import { Axios } from './axios';

export async function hintPageService(guestId: number) {
  try {
    const response = await Axios.get(`/api/hints/answers/${guestId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
