import styles from '@/styles/hint/HintMessage.module.css';

type Props = {
  tag: number;
  text: string;
};

function HintMessage(props: Props) {
  return (
    <div className={`${styles.Message} ${props.tag === 1 ? styles.MyMessage : styles.YourMessage}`}>
      <div className={`FontBasic FontS ${styles.TextContent} ${props.tag === 1 ? styles.MyText : styles.YourText}`}>
        {props.text}
      </div>
    </div>
  );
}

export default HintMessage;
