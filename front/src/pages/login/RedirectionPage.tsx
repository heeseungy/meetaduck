import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginState } from '@/recoil/atom';
import { Axios } from '@/services/axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function RedirectionPage() {
  const setLogin = useSetRecoilState(loginState);
  const login = useRecoilValue(loginState);

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
        setLogin({
          kakaoId: response.data.kakaoId,
          guestId: response.data.guestId,
          partyId: response.data.partyId,
          nickname: response.data.nickname,
          profileUrl: response.data.profileUrl,
          thumbnailUrl: response.data.thumbnailUrl,
          userId: response.data.userId,
        });

        // 방법2 recoil에 token을 저장해서 필요할때마다
        // token이 있는지 없는지 확인 후 로그인 상태를 검사함.
        alert('로그인 되었습니다');
        navigate('/party');
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   console.log('login.kakaoId', login.kakaoId);
  // }, [login.kakaoId]);

  return <div className="FontM">로그인 중입니다.</div>;
}

export default RedirectionPage;
