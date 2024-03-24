import { Axios } from "./axios";

export async function HintInputQuestionService() {
  try {
    const response = await Axios.get(`/api/hints/${guestId}`)
    return response
  } catch(err) {
    console.log("err:", err);
  }
}