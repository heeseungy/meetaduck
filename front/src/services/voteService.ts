import { Axios } from './axios';

export async function votePersonService(guestId: number, votedId: number) {
  try {
    const response = await Axios.patch(
      `/api/guests`,
      {
        guestId: guestId,
        votedId: votedId,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function partyListAll(partyId: number) {
  try {
    const response = await Axios.get(`/api/guests/all/${partyId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
