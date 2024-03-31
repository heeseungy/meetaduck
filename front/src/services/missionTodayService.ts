import { bool } from 'aws-sdk/clients/signer';

import { Axios } from './axios';

export async function missionTodayService(guestId: number) {
  try {
    const response = await Axios.get(`/api/missions/${guestId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function missionNewService(missionStatusId: number) {
  try {
    const response = await Axios.patch(
      `/api/missions/pass`,
      {
        missionStatusId: missionStatusId,
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

export async function missionUploadService(missionStatusId: number, missionImageUrl: string) {
  try {
    const response = await Axios.patch(
      `/api/missions/update`,
      {
        missionStatusId: missionStatusId,
        missionImageUrl: missionImageUrl,
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

export async function manitoMissionLoad(guestId: number) {
  try {
    const response = await Axios.get(`/api/missions/mymanito/${guestId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function manitoNickname(guestId: number) {
  try {
    const response = await Axios.get(`/api/guests/maniti/${guestId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function completeMissionLoad(guestId: number) {
  try {
    const response = await Axios.get(`/api/results/missions/${guestId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
      },
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function confirmMission(missionStatusId: number, missionSuccessResult: bool) {
  try {
    const response = await Axios.patch(
      `/api/missions/success`,
      {
        missionStatusId: missionStatusId,
        missionSuccessResult: missionSuccessResult,
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
