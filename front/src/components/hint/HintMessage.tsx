import styles from '@/styles/hint/HintMessage.module.css';

type Props = {
  tag: number;
  text: string;
};

function HintMessage(props: Props) {
  return (
    <div>
      <div
        className={`FontBasic FontM ${styles.TextBox} ${styles.Message} ${styles.TextContent} ${props.tag === 1 ? styles.MyMessage : styles.YourMessage} `}
      >
        {props.text}
      </div>
    </div>
  );
}

export default HintMessage;
