import styles from '@/styles/commons/Input.module.css';

interface InputProps {
  maxLength: number;
  usersInput: string;
  onChange: (value: string) => void;
}

function Input({ maxLength, usersInput, onChange }: InputProps) {
  const saveUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <input maxLength={maxLength} type="text" className={`${styles.box}`} value={usersInput} onChange={saveUserInput} />
  );
}

export default Input;
