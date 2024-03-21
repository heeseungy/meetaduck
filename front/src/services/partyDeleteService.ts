import { Axios } from "./axios";

export async function partyDeleteervice() {
  try {
    const response = await Axios.delete(`/api/parties`, {
      // params: {
      //   accessCode: ,
      //   endTime: ,
      //   userId: ,
      // }
    });
    // console.log(response);
  } catch (err) {
    console.log(err)
  }
}