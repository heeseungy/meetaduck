import React, { ReactNode } from 'react';

import styles from '../../styles/Frame.module.css';

type FrameProps = {
  children: ReactNode;
};
const Frame = ({ children }: FrameProps) => <div className={styles.Frame}> {children} </div>;

export default Frame;
