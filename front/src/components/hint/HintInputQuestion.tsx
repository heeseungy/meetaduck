import Input from '../commons/Input';

function HintInputQuestion() {
  const questionList = ['나의 별자리는?', '나의 생일은?', '나의 취미는?'];
  return (
    <>
      <div>{questionList[0]}</div>
      <Input />
    </>
  );
}

export default HintInputQuestion;
