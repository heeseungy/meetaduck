import pairChat from '@/assets/images/pairChat.png';
import styles from '@/styles/hint/HintProfile.module.css';

type Props = {
  tag: number;
};
function HintProfile(props: Props) {
  return (
    <>
      <img
        className={`${styles.HintAvatar} ${props.tag === 1 ? styles.MyAvatar : styles.YourAvatar}`}
        src={pairChat}
        alt="hintProfileImage"
      />
    </>
  );
}

export default HintProfile;
