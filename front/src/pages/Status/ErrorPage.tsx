import { useNavigate } from 'react-router-dom';

import Button from '@/components/commons/Button';
import styles from '@/styles/ErrorPage.module.css';

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.ErrorContainer}>
        <div className={`${styles.Title}`}>
          <div className={`FontXL `}>에러페이지</div>
          <div className={`FontM`}>문제가 발생했어요😥</div>
        </div>
        <Button
          bgc="voteFinish"
          onClickHandler={() => {
            navigate('/login');
          }}
        >
          홈으로 돌아가기
        </Button>
      </div>
    </>
  );
}

export default ErrorPage;
