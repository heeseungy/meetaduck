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
        // 방법 1 localStroage에 넣고
        // const JWT_Token = response.headers.jwtToken;
        // localStorage.setItem('token', JWT_Token);
        
        // 그 토큰을 받아서 로그인 유지 : 저장한 토큰을 필요할때마다 request에 담아서 보냄.
        // Axios.get('주소'. {
        //   headers: {
        //     Authorization: `Bearer ${localStorage.getItem('token')}`
        //   },
        // })

        // 방법2 recoil에 token을 저장해서 필요할때마다
        // token이 있는지 없는지 확인 후 로그인 상태를 검사함. 

        navigate('/party');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // return <div>로그인 중입니다.</div>;
}

export default RedirectionPage;
