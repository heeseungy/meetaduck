import duckLogo from '@/assets/images/RubberDuckWithLogo.png';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import styles from '@/styles/Partyjoin.module.css';

function PartyPage() {
  return (
    <div className={styles.container}>
      <img src={duckLogo} alt="duckLogo" className={styles.marginTop} />
      <div className={`FontBasic FontL ${styles.joinTitle} `}>파티 참여 코드</div>
      <div className={styles.marginTop}>
        <Input />
      </div>
      <div className={styles.marginTop}>
        <Button bgc="filled">참여하기</Button>
      </div>
      <div className={styles.noPartySection}>파티가 없으신가요?</div>
      <Button bgc='empty'>만들기</Button>
    </div>
  );
}

export default PartyPage;
