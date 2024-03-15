import duckLogo from '@/assets/images/RubberDuckWithLogo.png';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import styles from '@/styles/party/Partyjoin.module.css';

function PartyCreatePage() {
  return (
    <div className={styles.container}>
      <img src={duckLogo} alt="duckLogo" className={styles.marginTop} />
      <div className={`FontBasic FontL ${styles.joinTitle} `}>파티명</div>
      <div className={styles.marginTop}>
        <Input />
      </div>
      <div className={styles.marginTop}>
        <Button bgc="filled">파티열기</Button>
      </div>
      <div className={styles.noPartySection}>
        <div>오늘의 명언(삭제예정)</div>
        <div>먼저핀꽃은 먼저진다</div>
        <div>남보다 먼저 공을 세우려고</div>
        <div>조급히 서둘것이 아니다</div>
        <div>– 채근담</div>
      </div>
    </div>
  );
}

export default PartyCreatePage;
