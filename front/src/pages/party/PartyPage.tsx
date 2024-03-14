import duckLogo from '@/assets/images/RubberDuckWithLogo.png';
import styles from '@/styles/Partyjoin.module.css';

function PartyPage() {
  return (
    <div className={styles.container}>
      <img src={duckLogo} alt="duckLogo" className={styles.marginTop} />
      <div className={`FontBasic FontL ${styles.joinTitle} `}>파티 참여 코드</div>
    </div>
  );
}

export default PartyPage;
