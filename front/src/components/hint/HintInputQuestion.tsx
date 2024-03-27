import styles from '@/styles/hint/HintInputQuestion.module.css';

import Button from '../commons/Button';
import Input from '../commons/Input';
import { HintInputQuestionService } from '@/services/HintInputQuestionService';
import { Axios } from '@/services/axios';
import { useRecoilValue } from "recoil";
import { loginState } from "@/recoil/atom";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HintInputQuestion() {
  // const questionList = [
  //   {
  //     "hintId": 1,
  //     "hintContent": "별자리는 무엇인가요?"
  //   },
  //   {
  //     "hintId": 3,
  //     "hintContent": "최근에 본 가장 인상 깊은 영화는 무엇인가요?"
  //   }
  // ];

  const [hints, setHints] = useState([
    {
      "hintId": 1,
      "hintContent": "별자리는 무엇인가요?"
    },
    {
      "hintId": 3,
      "hintContent": "최근에 본 가장 인상 깊은 영화는 무엇인가요?"
    }
  ]);
  const [hintStatusAnswer, setHintStatusAnswer] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useRecoilValue(loginState);
  const guestId = login.guestId;

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
      {hints.length === 0 ? (
        <div>힌트가 없습니다.</div>
      ) : (      
        hints!.map((hint) => (
          <div key={hint.hintId} className={styles.bottom2}>
            <div className={styles.bottom}>
              <div>{hint.hintContent}</div>
            </div>
            <Input usersInput={hintStatusAnswer} onChange={setHintStatusAnswer} />
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
