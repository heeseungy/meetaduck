import styles from '@/styles/Button.module.css'

function Button({ children }) {
  return (
    <>
      <button className={`FontM ${styles.box}`}>{children}</button>
    </>
  );
}

export default Button;
