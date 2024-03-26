import styles from '@/styles/hint/HintInputQuestion.module.css';

import Button from '../commons/Button';
import Input from '../commons/Input';
import { HintInputQuestionService } from '@/services/HintInputQuestionService';
import { Axios } from '@/services/axios';
import { useRecoilValue } from "recoil";
import { loginState } from "@/recoil/atom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HintInputQuestion() {
  // const questionList = ['나의 별자리는?', '나의 생일은?', '나의 취미는?'];
  const [hintStatusAnswer, setHintStatusAnswer] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useRecoilValue(loginState);
  const guestId = login.guestId;

  const responses = HintInputQuestionService(guestId);

  const hintSubmitHandler = () => {
    if (!hintStatusAnswer.trim()) {
      setError("입력이 필요합니다");
      return;
    }
    try {
      Axios.patch(`/api/hints/${guestId}`, {
        hintId: 11,
        hintStatusAnswer: hintStatusAnswer,
      })
      alert('입력이 완료되었습니다~!');
      navigate('/mission');
    } catch(err) {
      console.log("errr:", err);
    }
  }

  return (
    <>
      {responses === null ? <div>responses = null입니다</div> :
        responses!.map((response) => (
          <div key={response.hintId} className={styles.bottom2}>
            <div className={styles.bottom}>
              <div>{response.hintContent}</div>
            </div>
            <Input usersInput={hintStatusAnswer} onChange={setHintStatusAnswer} />
          </div>
        ))
      }
      {error && <div className={styles.errorMessage}>{error}</div>}
      <div className={`${styles.oneButton}`}>
        <Button onClickHandler={hintSubmitHandler} bgc="filled">입력 완료</Button>
      </div>
    </>
  );
}

export default HintInputQuestion;
