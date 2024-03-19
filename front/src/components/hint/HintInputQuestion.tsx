import styles from '@/styles/hint/HintInputQuestion.module.css';

import Input from '../commons/Input';

function HintInputQuestion() {
  const questionList = ['나의 별자리는?', '나의 생일은?', '나의 취미는?'];
  // {questionList.map((question) => {
  //   return <div>{question}</div>
  // })}
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
    </>
  );
}

export default HintInputQuestion;
