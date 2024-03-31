import { Axios } from './axios';

export async function updateHintAnswersService(guestId, hintData) {
  console.log('guestId:', guestId);
  console.log('hintData123:', hintData);

  try {
    await Axios.patch(`/api/hints/${guestId}`, hintData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
      },
    });
    console.log('힌트 답변이 성공적으로 업데이트되었습니다.');
  } catch (err) {
    console.error('힌트 답변 업데이트 중 오류 발생:', err);
    throw err;
  }
}
