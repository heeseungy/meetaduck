import styles from '@/styles/hint/HintInputQuestion.module.css';

import Button from '../commons/Button';
import Input from '../commons/Input';
import { HintInputQuestionService } from '@/services/HintInputQuestionService';
import { useEffect } from 'react';
function HintInputQuestion() {
  const questionList = ['나의 별자리는?', '나의 생일은?', '나의 취미는?'];
  // {questionList.map((question) => {
  //   return <div>{question}</div>
  // })}

  useEffect(() => {
    const response = HintInputQuestionService();
  }, [])
  return (
    <>
      {questionList.map((question) => (
        <div key={question} className={styles.bottom2}>
          <div className={styles.bottom}>
            <div>{question}</div>
          </div>
          <Input />
        </div>
      ))}
      <div className={`${styles.oneButton}`}>
        <Button bgc="filled">입력 완료</Button>
      </div>
    </>
  );
}

export default HintInputQuestion;
