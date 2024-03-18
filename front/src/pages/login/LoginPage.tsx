import duckLogo from '@/assets/images/RubberDuckBase.png';
import kakaoLogo from '@/assets/images/kakao_login_large_wide.png';
import { Axios } from '@/services/axios';

import styles from '../../styles/login/LoginPage.module.css';

function LoginPage() {
  const loginHandler = () => {
    // const response = Axios.post('api/users/oauth/kakao')
    const response = Axios.post('/posts');
    console.log(response);
    console.log('카카오로 로그인하기');
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
