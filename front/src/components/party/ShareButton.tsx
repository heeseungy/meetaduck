import styles from '@/styles/party/PartyMaker.module.css';

interface PropType {
  children: string;
}

function ShareButton({ children }: PropType) {
  const clickHandler = () => {
    console.log('참여 공유 버튼 클릭!');
  };
  return (
    <button onClick={clickHandler} className={`FontM ${styles.share}`}>
      {children}
    </button>
  );
}

export default ShareButton;
