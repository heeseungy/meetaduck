import styles from '@/styles/commons/Input.module.css';

interface InputProps {
  maxLength?: number;
  usersInput: string;
  onChange: (value: string) => void;
  className?: string;
}

function Input({ maxLength, usersInput, className = styles.box, onChange }: InputProps) {
  const saveUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <input maxLength={maxLength} type="text" className={`${className}`} value={usersInput} onChange={saveUserInput} />
  );
}

export default Input;
