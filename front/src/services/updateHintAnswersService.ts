import { Axios } from "./axios";

export async function updateHintAnswersService(guestId, hintStatusAnswers) {
  try {
    await Axios.patch(`/api/hints/${guestId}`, hintStatusAnswers);
    console.log('힌트 답변이 성공적으로 업데이트되었습니다.');
  } catch (err) {
    console.error('힌트 답변 업데이트 중 오류 발생:', err);
    throw err;
  }
}