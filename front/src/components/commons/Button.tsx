import styles from '@/styles/commons/Button.module.css';
import { ButtonProps } from '@/types/button';

function Button({ onClickHandler, children, bgc = 'filled' }: ButtonProps) {
  return (
    <button onClick={onClickHandler} className={`${styles.box} ${styles[bgc]}`}>
      {children}
    </button>
  );
}

export default Button;
