import { Axios } from './axios';

export async function hintPageService(guestId: number) {
  try {
    const response = await Axios.get(`/api/hints/answers/${guestId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
