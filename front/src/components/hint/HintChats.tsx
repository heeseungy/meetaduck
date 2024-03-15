import styles from '@/styles/hint/HintChats.module.css';
import { Answer } from '@/types/hint';

import HintMessage from './HintMessage';
import HintProfile from './HintProfile';

function HintChats(props: Answer) {
  return (
    <>
      <div className={`${styles.Chats} ${styles.MyChat}`}>
        <HintMessage {...{ tag: 1, text: props.hintContent }} />
        <HintProfile {...{ tag: 1 }} />
      </div>
      <div className={`${styles.Chats} ${styles.YourChat}`}>
        <HintProfile {...{ tag: 0 }} />
        <HintMessage {...{ tag: 0, text: props.hintStatusAnswer }} />
      </div>
    </>
  );
}
export default HintChats;
