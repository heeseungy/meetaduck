import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import loading from '@/assets/images/loading.gif';
import Button from '@/components/commons/Button';
import Loading from '@/components/commons/Loading';
import { partyState } from '@/recoil/atom';
import { resultRetry } from '@/services/resultService';
import styles from '@/styles/ErrorPage.module.css';
import { ArrowCounterClockwise } from '@phosphor-icons/react';
import { useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';

function ResultErrorPage() {
  const party = useRecoilValue(partyState);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshToggle, setRefreshToggle] = useState(false);
  const navigate = useNavigate();
  const retry = () => {
    setRefreshToggle(true);
    setTimeout(() => {
      setRefreshToggle(false);
    }, 2000);
    setIsLoading(true);

    resultRetry(party.partyId)
      .then((data: { isSuccess: boolean }) => {
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
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  return (
    <>
      <div className={styles.ErrorContainer}>
        <div className={styles.LoadingContainer}>
          {isLoading ? (
            <div className={styles.Loading1}>
              <div className={`FontMTitle FontBasic `}>　로딩 중...</div>
              <img src={loading} alt="" />
            </div>
          ) : (
            <>
              <div className={`${styles.Title}`}>
                <div className={`FontXL `}>에러페이지</div>
                <div className={`FontM`}>결과 분석에 실패했어요😥</div>
                <div className={`FontS FontBasic`}>잠시 후 다시 시도해주세요.</div>
              </div>
              <div className={`${styles.ResultRetry}`} onClick={retry}>
                <ArrowCounterClockwise
                  className={`${refreshToggle && styles.RefreshAnimation}`}
                  size={32}
                  // color="#eea23e"
                  color="#ffffff"
                  weight="bold"
                />
              </div>
            </>
          )}
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
