import styles from '@/styles/commons/Input.module.css';

interface InputProps {
  usersInput: string;
  onChange: (value: string) => void;
}

function Input({ usersInput, onChange }: InputProps) {
  const saveUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    console.log(e.target.value);
  };
  return <input type="text" className={`${styles.box}`} value={usersInput} onChange={saveUserInput} />;
}

export default Input;
