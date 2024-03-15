import tempImg from '@/assets/images/RubberDuckBase.png';
import styles from '@/styles/commons/ProfileName.module.css';

function ProfileName() {
  const dummyData = {
    tempImg: tempImg,
    tempName: '안준선',
  };

  return (
    <div className={`${styles.vertCenter}`}>
      <img src={dummyData.tempImg} alt="tempImg" className={`${styles.border}`} />
      <span className={`${styles.name}`}>{dummyData.tempName}</span>
    </div>
  );
}

export default ProfileName;
