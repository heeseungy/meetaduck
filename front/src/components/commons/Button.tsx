import styles from '@/styles/Button.module.css';
import { ButtonProps } from '@/types/button';

function Button({ children, bgc = 'filled' }: ButtonProps) {
  return (
    <>
      <button className={`FontM ${styles.box} ${styles[bgc]}`}>{children}</button>
    </>
  );
}

export default Button;
