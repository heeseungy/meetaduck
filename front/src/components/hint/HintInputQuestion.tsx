import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { loginState } from '@/recoil/atom';
import { HintInputQuestionService } from '@/services/HintInputQuestionService';
import { Axios } from '@/services/axios';
import { updateHintAnswersService } from '@/services/updateHintAnswersService';
import styles from '@/styles/hint/HintInputQuestion.module.css';
import { Answer, Hint } from '@/types/hint';
import { useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';

import Button from '../commons/Button';
import Input from '../commons/Input';

function HintInputQuestion() {
  const [hints, setHints] = useState<Hint[]>([]);
  const [hintsAnswer, setHintsAnswer] = useState<Answer[]>([]);
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const login = useRecoilValue(loginState);
  const guestId = login.guestId;

  useEffect(() => {
    HintInputQuestionService(guestId).then((data: Hint[]) => {
      console.log('data:', data);
      setHints(data);
      if (data.length === 1 && data[0].hintId === 0) {
        sessionStorage.setItem('finishHintInput', 'true');
        navigate('/mission');
      } else {
        setHintsAnswer(
          data.map((it) => ({
            hintId: it.hintId,
            hintContent: it.hintContent,
            hintStatusAnswer: '',
          })),
        );
      }
    });
    // async function fetchHints() {
    //   try {
    //     const hintsData = await HintInputQuestionService(guestId);
    //     console.log('hintsData:', hintsData);
    //     setHints(hintsData);
    //   } catch (err) {
    //     console.log('Error fetching hints:', err);
    //   }
    // }

    // fetchHints();
  }, []);

  const hintSubmitHandler = async () => {
    const isEmptyInput = hintsAnswer.some((hint) => hint.hintStatusAnswer === '');
    if (isEmptyInput) {
      Swal.fire({
        icon: 'warning',
        html: '힌트의 답변을 모두 입력해주세요.',
        confirmButtonColor: '#eea23e',
      });

      // alert('힌트 답변을 모두 입력하세요.');
      return;
    } else {
      const hintData = hintsAnswer.map((hint) => ({
        hintId: hint.hintId,
        hintStatusAnswer: hint.hintStatusAnswer,
      }));

      try {
        console.log('hintData:', hintData);
        await updateHintAnswersService(guestId, hintData)
          .then(() => {
            Swal.fire({
              icon: 'success',
              html: '입력이 완료되었습니다~!',
              showConfirmButton: false,
              timer: 1500,
            });
            // alert('입력이 완료되었습니다~!');
            sessionStorage.setItem('finishHintInput', 'true');
          })
          .then(() => {
            navigate('/mission');
          });
      } catch (err) {
        console.log('Error updating hint answers:', err);
        Swal.fire({
          icon: 'error',
          html: '입력 중 오류가 발생했습니다. 다시 시도해주세요.',
          confirmButtonColor: '#eea23e',
        });
        // alert('입력 중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <>
      <div>
        {hints.length === 0 ? (
          <div>힌트가 없습니다.</div>
        ) : (
          hintsAnswer.map((hint, index) => (
            <div key={hint.hintId} className={styles.bottom2}>
              <div className={styles.bottom}>
                <div className="FontSBold">{hint.hintContent}</div>
              </div>
              <Input
                usersInput={hint.hintStatusAnswer || ''}
                // 상태 변수를 해당 힌트의 상태 변수로 변경
                // onChange={(newValue) => {
                //   const updatedHints = [...hints];
                //   updatedHints[index].hintStatusAnswer = newValue;
                //   setHints(updatedHints);
                // }}
                onChange={(newValue) => {
                  setHintsAnswer((prevHints) => {
                    const updatedHints = [...prevHints]; // 이전 상태를 복사하여 새로운 배열 생성
                    updatedHints[index].hintStatusAnswer = newValue; // 새로운 배열에서 해당 힌트의 상태 업데이트
                    console.log(hintsAnswer);
                    return updatedHints; // 새로운 상태 반환
                  });
                }}
              />
            </div>
          ))
        )}
      </div>
      {/* {error && <div className={styles.errorMessage}>{error}</div>} */}
      <div className={`${styles.oneButton}`}>
        <Button onClickHandler={hintSubmitHandler} bgc="filled">
          입력 완료
        </Button>
      </div>
    </>
  );
}

export default HintInputQuestion;
