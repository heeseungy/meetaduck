import { Axios } from "./axios";

export async function partyStartService() {
  try {
    const response = await Axios.patch(`/api/parties`, {
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