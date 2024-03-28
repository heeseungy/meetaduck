import { useEffect } from 'react';

import Card from '@/components/commons/Card';
import HintInputQuestion from '@/components/hint/HintInputQuestion';
import { loginState } from '@/recoil/atom';
import { hintPageService } from '@/services/hintPageService';
import styles from '@/styles/hint/HintInputFormPage.module.css';
import { Answer } from '@/types/hint';
import { useRecoilValue } from 'recoil';

function HintInputFormPage() {
  const login = useRecoilValue(loginState);
  useEffect(() => {
    hintPageService(login.guestId).then((data: Answer) => {
      if (data.hintStatusAnswer !== null) {
        sessionStorage.setItem('finishHintInput', 'true');
      }
    });
  });
  const children = (
    <div className={styles.cardMargin}>
      <form action="#">
        <HintInputQuestion />
      </form>
    </div>
  );

  return (
    <div>
      <header className={styles.Header}>
        <div className={`FontL FontBasic`}>당신에 대해 알려주세요!</div>
        <section className={`FontSBold ${styles.marginTop}`}>
          <div>미션을 수행하지 않으면</div>
          <div>입력한 힌트를 마니띠에게 알려줘요.</div>
        </section>
      </header>
      <Card {...{ tag: 1, children: children }} />
    </div>
  );
}

export default HintInputFormPage;
