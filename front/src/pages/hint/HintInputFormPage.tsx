import Card from '@/components/commons/Card';
import HintInputQuestion from '@/components/hint/HintInputQuestion';
import styles from '@/styles/hint/HintInputFormPage.module.css';

function HintInputFormPage() {
  const children = (
    <div className={styles.cardMargin}>
      <form action="#">
        <HintInputQuestion />

      </form>
    </div>
  );

  return (
    <div className={styles.margin}>
      <header>
        <div className={`FontL FontBasic`}>당신에 대해 알려주세요!</div>
        <section className={`FontS ${styles.marginTop}`}>
          <div>미션을 수행하지 않으면</div>
          <div>입력한 힌트를 마니띠에게 알려줘요.</div>
        </section>
        <div className={styles.cardContainer}>
          <Card {...{ tag: 2, children: children }} />
        </div>
      </header>
    </div>
  );
}

export default HintInputFormPage;
