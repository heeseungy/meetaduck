import { Axios } from './axios';

export async function pairResultService(partyId: number) {
  try {
    const response = await Axios.get(`/api/guests/pairs/${partyId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getOneInfoService(guestId: number) {
  try {
    const response = await Axios.get(`/api/guests/${guestId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getManitoAnalysis(guestId: number) {
  try {
    const response = await Axios.get(`/api/results/manito/${guestId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getManitiAnalysis(guestId: number) {
  try {
    const response = await Axios.get(`/api/results/maniti/${guestId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
