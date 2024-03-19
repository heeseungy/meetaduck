import { Axios } from "./axios";

export async function loginService(code: string) { //code: string
  const response = await Axios.post('api/users/login', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8', //json형태로 데이터를 보내겠다는뜻
      'Access-Control-Allow-Origin': '*', //이건 cors 에러때문에 넣어둔것. 당신의 프로젝트에 맞게 지워도됨
    },
    params: {
      code: code,
    },
  })
    .then((res) => {
      console.log(res);
      // navigate("/home");
    })
    .catch((error) => {
      console.log(error);
    });
  // console.log(response.data);
}