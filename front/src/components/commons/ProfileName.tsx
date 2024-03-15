import tempImg from '@/assets/images/RubberDuckBase.png';
import styles from '@/styles/commons/ProfileName.module.css';

function ProfileName() {
  const dummyData = {
    profileImg: tempImg,
    profileName: '안준선',
  };

  return (
    <div className={`${styles.vertCenter}`}>
      <img src={dummyData.profileImg} alt="tempImg" className={`${styles.border}`} />
      <span className={`FontBasic ${styles.name}`}>{dummyData.profileName}</span>
    </div>
  );
}

export default ProfileName;
