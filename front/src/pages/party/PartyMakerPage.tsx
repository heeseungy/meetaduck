import styles from '@/styles/party/PartyMaker.module.css'
import ShareButton from '@/components/party/ShareButton';
function PartyMakerPage() {
  return (
    <div className={styles.margin}>
      <header>
        <span className={`FontL`}>블랙펄 마니또</span>
        <span className={styles.marginLeft}>
          <ShareButton>참여 코드 공유</ShareButton>
        </span>
      </header>
    </div>
  );
}

export default PartyMakerPage;
