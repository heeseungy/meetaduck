import { Axios } from './axios';

export async function updateHintAnswersService(guestId, { hintId, hintStatusAnswer }) {
  try {
    await Axios.patch(`/api/hints/${guestId}`, {
      hindId: hintId,
      hintStatusAnswer: hintStatusAnswer,
    });
    console.log('힌트 답변이 성공적으로 업데이트되었습니다.');
  } catch (err) {
    alert('오류!')
    console.error('힌트 답변 업데이트 중 오류 발생:', err);
    throw err;
  }
}
