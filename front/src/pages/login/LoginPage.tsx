import duckLogo from '@/assets/images/RubberDuckBase.png';
import kakaoLogo from '@/assets/images/kakao_login_large_wide.png';
import { Axios } from '@/services/axios';

import styles from '../../styles/login/LoginPage.module.css';

function LoginPage() {
  const KAKAO_OAUTH_URL = import.meta.env.VITE_KAKAO_OAUTH_URL;
  const KAKAO_CLIENT_ID = import.meta.env.VITE_KAKAO_CLIENT_ID;
  const KAKAO_LOGIN_REDIRECT_URI = import.meta.env.VITE_KAKAO_LOGIN_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_LOGIN_REDIRECT_URI}&response_type=code`;

  const code = new URLSearchParams(window.location.search).get('code');
  // const code = window.location.search;
  const loginHandler = async () => {
    window.location.href = kakaoURL;


    const response = await Axios
      .post('api/users/login', {
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
  };

  return (
    <>
      <header className={`FontXXL ${styles.horizonCenter}`}>
        <div className={styles.paddingTop}>
          <span className={`FontBasic`}>믿어, </span>
          <span className={`FontWhite`}>덕.</span>
        </div>
        <div className={styles.marginTop}>
          <span className={`FontBasic`}>Meet, A </span>
          <span className={`FontWhite`}>Duck.</span>
        </div>
      </header>
      <main className={`FontM ${styles.marginTop} ${styles.horizonCenter}`}>
        <p>나의 마니또는 누구일까요?</p>
        <p>채팅과 미션을 통해 알아보세요!</p>
        <img src={duckLogo} alt="Logo" className={styles.logoImg} />
      </main>
      <div className={styles.kakaoButtonWrapper}>
        <img src={kakaoLogo} alt="kakaoLogin" className={styles.kakaoButton} onClick={loginHandler} />
      </div>
    </>
  );
}

export default LoginPage;
