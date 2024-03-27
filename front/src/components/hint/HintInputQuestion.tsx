import styles from '@/styles/hint/HintInputQuestion.module.css';

import Button from '../commons/Button';
import Input from '../commons/Input';
import { HintInputQuestionService } from '@/services/HintInputQuestionService';
import { Axios } from '@/services/axios';
import { useRecoilValue } from "recoil";
import { loginState } from "@/recoil/atom";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateHintAnswersService } from '@/services/updateHintAnswersService';

function HintInputQuestion() {
  const [hints, setHints] = useState([
    {
      "hintId": 1,
      "hintContent": "별자리는 무엇인가요?",
      "hintStatusAnswer": "" // 각 힌트에 대한 상태 변수 추가
    },
    {
      "hintId": 3,
      "hintContent": "최근에 본 가장 인상 깊은 영화는 무엇인가요?",
      "hintStatusAnswer": ""
    }
  ]);

  // useEffect(() => {
  //   async function fetchHints() {
  //     try {
  //       const hintsData = await HintInputQuestionService(guestId);
  //       setHints(hintsData);
  //     } catch (err) {
  //       console.log("Error fetching hints:", err);
  //     }
  //   }

  //   fetchHints();
  // }, [guestId]);
  
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useRecoilValue(loginState);
  const guestId = login.guestId;

  const hintSubmitHandler = async () => {
    // 모든 입력란이 비어 있는지 확인
    const isEmpty = hints.some(hint => !hint.hintStatusAnswer.trim());
    if (isEmpty) {
      setError("모든 답변을 입력하세요");
      return;
    }
    try {
      // 각 힌트에 대한 답변을 서버에 업데이트
      await Promise.all(hints.map(hint =>
        updateHintAnswersService(guestId, hint.hintStatusAnswer)
      ));
      alert('입력이 완료되었습니다~!');
      navigate('/mission');
    } catch(err) {
      console.log("errr:", err);
    }
  }

  return (
    <>
      {hints.length === 0 ? (
        <div>힌트가 없습니다.</div>
      ) : (      
        hints.map((hint, index) => (
          <div key={hint.hintId} className={styles.bottom2}>
            <div className={styles.bottom}>
              <div>{hint.hintContent}</div>
            </div>
            <Input
              usersInput={hint.hintStatusAnswer}
              // 상태 변수를 해당 힌트의 상태 변수로 변경
              onChange={newValue => {
                const updatedHints = [...hints];
                updatedHints[index].hintStatusAnswer = newValue;
                setHints(updatedHints);
              }}
            />
          </div>
        ))
      )}
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={`${styles.oneButton}`}>
        <Button onClickHandler={hintSubmitHandler} bgc="filled">입력 완료</Button>
      </div>
    </>
  );
}

export default HintInputQuestion;