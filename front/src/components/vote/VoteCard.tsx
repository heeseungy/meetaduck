import voteBefore from '@/assets/images/voteBefore.png';
import styles from '@/styles/vote/VoteCard.module.css';

function VoteCard() {
  return (
    <div className={`${styles.VoteCard}`}>
      <div className={`FontSBold`}>
        <p>내 마니또는 누구?</p> <p>마니또를 찾아보세요!</p>
      </div>
      <img src={voteBefore} alt="" />
    </div>
  );
}

export default VoteCard;
