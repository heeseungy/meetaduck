import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginState, partyState } from '@/recoil/atom';
import { Axios } from '@/services/axios';
import { partyInfoService } from '@/services/partyStartService';
import styles from '@/styles/login/LoginPage.module.css';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function RedirectionPage() {
  const login = useRecoilValue(loginState);
  const setLogin = useSetRecoilState(loginState);

  const party = useRecoilValue(partyState);
  const setParty = useSetRecoilState(partyState);
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
        console.log(response.data);
        if (response.data.partyId !== 0) {
          partyInfoService(response.data.partyId)
            .then((data) => {
              if (data.deleted !== true) {
                setParty({
                  partyId: data.partyId,
                  accessCode: data.accessCode,
                  partyName: data.partyName,
                  startTime: data.startTime,
                  endTime: data.endTime,
                  deleted: data.deleted,
                  userId: data.userId,
                });
              }
              return response;
              // 방법2 recoil에 token을 저장해서 필요할때마다
              // token이 있는지 없는지 확인 후 로그인 상태를 검사함.
              // alert('로그인 되었습니다');
            })
            .then((response) => {
              setLogin({
                kakaoId: response.data.kakaoId,
                guestId: response.data.guestId,
                partyId: response.data.partyId,
                nickname: response.data.nickname,
                profileUrl: response.data.profileUrl,
                thumbnailUrl: response.data.thumbnailUrl,
                userId: response.data.userId,
              });
              console.log(login.partyId);

              navigate('/partymaker');
            });
        } else {
          setLogin({
            kakaoId: response.data.kakaoId,
            guestId: response.data.guestId,
            partyId: response.data.partyId,
            nickname: response.data.nickname,
            profileUrl: response.data.profileUrl,
            thumbnailUrl: response.data.thumbnailUrl,
            userId: response.data.userId,
          });
          console.log(login.partyId);

          navigate('/party');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div className={`FontMTitle ${styles.Center}`}>로그인 중입니다... 👀</div>;
}

export default RedirectionPage;
