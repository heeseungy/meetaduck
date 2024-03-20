import styles from '@/styles/webSocket/TestPage2.module.css';
import { PaperPlaneTilt } from '@phosphor-icons/react';

function TestPage2() {
  return (
    <div className={styles.Box}>
      <div className={styles.Input}>
        <input type="text" />
        <button type="submit">
          {' '}
          <PaperPlaneTilt size={32} />
        </button>
      </div>
    </div>
  );
}

export default TestPage2;
