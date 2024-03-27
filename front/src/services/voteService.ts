import { Axios } from './axios';

export async function votePersonService(guestId: number, votedId: number) {
  try {
    const response = await Axios.patch(`/api/guests`, { guestId: guestId, votedId: votedId });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
