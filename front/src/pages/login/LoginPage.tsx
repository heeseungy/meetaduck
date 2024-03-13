import duckLogo from '@/assets/images/RubberDuckBase.png';
import kakaoLogo from '@/assets/images/kakao_login_large_wide.png';

import styles from '../../styles/LoginPage.module.css';

function LoginPage() {
  const loginHandler = () => {
    console.log('카카오로 로그인하기');
  };

  return (
    <>
      <header className={styles.HeadFont}>
        <div>
          <span className={styles.HeadDark}>믿어, </span>
          <span className={styles.HeadWhite}>덕.</span>
        </div>
        <div>
          <span className={styles.HeadDark}>Meet, A </span>
          <span className={styles.HeadWhite}>Duck.</span>
        </div>
      </header>
      <main>
        <p>나의 마니또는 누구일까요?</p>
        <p>채팅과 미션을 통해 알아보세요!</p>
        <img src={duckLogo} alt="Logo" />
      </main>
      <img src={kakaoLogo} alt="kakaoLogin" className={styles.kakaoButton} onClick={loginHandler} />
    </>
  );
}

export default LoginPage;
