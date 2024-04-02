import loading from '@/assets/images/loading.gif';
import styles from '@/styles/ErrorPage.module.css';
import Frame from './Frame';

export default function Loading() {
  return (
    <>
    <div className={styles.Loading}>
      <div className={`FontMTitle FontBasic `}>　로딩 중...</div>
      <img src={loading} alt="" />
    </div>
    <Frame></Frame>
    </>
  );
}
