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

export async function partyLeaveCompleteService(guestId: number) {
  try {
    console.log('leave jwt ', sessionStorage.getItem('JWT'));
    const response = await Axios.patch(
      `/api/guests/${guestId}/leave`,
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
        },
      },
    );
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}
