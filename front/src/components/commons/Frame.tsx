// import { ReactNode } from 'react';
import FrameTemplate from '@/assets/images/FrameTemplate.png';
import styles from '@/styles/commons/Frame.module.css';

// type FrameProps = {
//   children: ReactNode;
// };
// const Frame = ({ children }: FrameProps) => <div className={styles.Frame}> {children} </div>;
const Frame = () => <img className={styles.Frame} src={FrameTemplate} alt="FrameTemplate" />;

export default Frame;
