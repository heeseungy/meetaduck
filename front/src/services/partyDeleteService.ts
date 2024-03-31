import { Axios } from './axios';

export async function partyLeaveService(guestId: number) {
  try {
    const response = await Axios.delete(`/api/guests/${guestId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
      },
    });
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}
