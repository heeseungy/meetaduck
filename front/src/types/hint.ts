export interface Answer {
  hintId: number;
  hintContent: string;
  hintStatusAnswer: string;
}
export type Hint = {
  tag: number;
  text: string;
};

const questionList: Hint[] = hintList.map((it) => ({
  tag: 1,
  text: it.hintContent,
}));

const answerList: Hint[] = hintList.map((it) => ({
  tag: 0,
  text: it.hintStatusAnswer,
}));