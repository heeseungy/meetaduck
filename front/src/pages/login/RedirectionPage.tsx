import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Axios } from '@/services/axios';

function RedirectionPage() {
  const code: string = new URLSearchParams(window.location.search).get('code')!;
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get('api/users/login', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8', //json형태로 데이터를 보내겠다는뜻
        'Access-Control-Allow-Origin': '*', //이건 cors 에러때문에 넣어둔것. 당신의 프로젝트에 맞게 지워도됨
      },
      params: {
        code: code,
      },
    })
      .then((response) => {
        console.log('responsessss : ', response);
        navigate('/party');
      })
      .catch((err) => {
        console.log(err);
      });
    // navigate('/party');
    // console.log(process.env.REACT_APP_URL);
    // if (code) {
    //   loginService(code);
    // } else {
    //   console.log('code 없음');
    // }
  }, []);
  // return <div>로그인 중입니다.</div>;
}

export default RedirectionPage;
