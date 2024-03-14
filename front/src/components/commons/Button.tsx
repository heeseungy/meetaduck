import styles from '@/styles/Button.module.css';

function Button({ children, bgc = 'filled' }) {
  return (
    <>
      <button className={`FontM ${styles.box} ${styles[bgc]}`}>{children}</button>
    </>
  );
}

export default Button;
