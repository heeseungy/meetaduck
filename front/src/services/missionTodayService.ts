import { bool } from 'aws-sdk/clients/signer';

import { Axios } from './axios';

export async function missionTodayService(guestId: number) {
  try {
    const response = await Axios.get(`/api/missions/${guestId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function missionNewService(missionStatusId: number) {
  try {
    const response = await Axios.patch(`/api/missions/pass`, { missionStatusId: missionStatusId });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function missionUploadService(missionStatusId: number, missionImageUrl: string) {
  try {
    const response = await Axios.patch(`/api/missions/update`, {
      missionStatusId: missionStatusId,
      missionImageUrl: missionImageUrl,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function manitoMissionLoad(guestId: number) {
  try {
    const response = await Axios.get(`/api/missions/mymanito/${guestId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function manitoNickname(guestId: number) {
  try {
    const response = await Axios.get(`/api/guests/maniti/${guestId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function completeMissionLoad(guestId: number) {
  try {
    const response = await Axios.get(`/api/results/missions/${guestId}`);
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function confirmMission(missionStatusId: number, missionSuccessResult: bool) {
  try {
    const response = await Axios.patch(`/api/missions/success`, {
      missionStatusId: missionStatusId,
      missionSuccessResult: missionSuccessResult,
    });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
