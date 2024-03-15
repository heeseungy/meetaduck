import pairChat from '@/assets/images/pairChat.png';
import styles from '@/styles/hint/HintProfile.module.css';

type Props = {
  tag: number;
};
function HintProfile(props: Props) {
  return (
    <div className={`${styles.HintAvatar} ${props.tag === 1 ? styles.MyAvatar : styles.YourAvatar}`}>
      <img className={`${styles.HintImage}`} src={pairChat} alt="hintProfileImage" />
    </div>
  );
}

export default HintProfile;
