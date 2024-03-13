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
        <div>이미지 공간입니다</div>
      </main>
      <button onClick={loginHandler}>카카오로 로그인하기</button>
    </>
  );
}

export default LoginPage;
