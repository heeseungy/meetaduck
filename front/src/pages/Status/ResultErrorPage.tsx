import { useNavigate } from 'react-router-dom';

import Button from '@/components/commons/Button';
import { partyState } from '@/recoil/atom';
import { resultRetry } from '@/services/resultService';
import styles from '@/styles/ErrorPage.module.css';
import { ArrowCounterClockwise } from '@phosphor-icons/react';
import { useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';

function ResultErrorPage() {
  const party = useRecoilValue(partyState);
  const navigate = useNavigate();
  const retry = () => {
    resultRetry(party.partyId).then((data: { isSuccess: boolean }) => {
      if (data.isSuccess) {
        navigate('/result');
      } else {
        Swal.fire({
          icon: 'error',
          html: '결과 분석에 실패했습니다.',
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
  };
  return (
    <>
      <div className={styles.ErrorContainer}>
        <div className={`${styles.Title}`}>
          <div className={`FontXL `}>에러페이지</div>
          <div className={`FontM`}>결과 분석에 실패했어요😥</div>
          <div className={`FontS FontComment`}>잠시 후 다시 시도해주세요.</div>
        </div>
        <div className={`${styles.ResultRetry}`} onClick={retry}>
          <ArrowCounterClockwise size={32} color="#fffff" weight="bold" />
        </div>
        <Button
          bgc="voteFinish"
          onClickHandler={() => {
            navigate('/');
          }}
        >
          홈으로 돌아가기
        </Button>
      </div>
    </>
  );
}

export default ResultErrorPage;
