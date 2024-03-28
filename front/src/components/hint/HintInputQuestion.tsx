import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { loginState } from '@/recoil/atom';
import { HintInputQuestionService } from '@/services/HintInputQuestionService';
import { Axios } from '@/services/axios';
import { updateHintAnswersService } from '@/services/updateHintAnswersService';
import styles from '@/styles/hint/HintInputQuestion.module.css';
import { Hint } from '@/types/hint';
import { useRecoilValue } from 'recoil';

import Button from '../commons/Button';
import Input from '../commons/Input';

function HintInputQuestion() {
  const [hints, setHints] = useState<Hint[]>([]);

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useRecoilValue(loginState);
  const guestId = login.guestId;

  useEffect(() => {
    // sessionStorage.setItem('finishHintInput', 'true');

    async function fetchHints() {
      try {
        const hintsData = await HintInputQuestionService(guestId);
        console.log('hintsData:', hintsData);
        setHints(hintsData);
      } catch (err) {
        console.log('Error fetching hints:', err);
      }
    }

    fetchHints();
  }, []);

  const hintSubmitHandler = async () => {
    const isEmptyInput = hints.some(hint => !hint.hintStatusAnswer);
    if (isEmptyInput) {
      alert('힌트 답변을 모두 입력하세요.');
      return;
    }
    
    const hintData = hints.map((hint) => ({
      hintId: hint.hintId,
      hintStatusAnswer: hint.hintStatusAnswer,
    }));

    try {
      console.log('hintData:', hintData);
      await updateHintAnswersService(guestId, hintData)
        .then(() => {
          alert('입력이 완료되었습니다~!');
          sessionStorage.setItem('finishHintInput', 'true');
        })
        .then(() => {
          navigate('/mission');
        });
    } catch (err) {
      console.log('Error updating hint answers:', err);
      alert('입력 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <>
      <div>
        {hints.length === 0 ? (
          <div>힌트가 없습니다.</div>
        ) : (
          hints.map((hint, index) => (
            <div key={hint.hintId} className={styles.bottom2}>
              <div className={styles.bottom}>
                <div className="FontSBold">{hint.hintContent}</div>
              </div>
              <Input
                usersInput={hint.hintStatusAnswer || ''}
                // 상태 변수를 해당 힌트의 상태 변수로 변경
                onChange={(newValue) => {
                  const updatedHints = [...hints];
                  updatedHints[index].hintStatusAnswer = newValue;
                  setHints(updatedHints);
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
