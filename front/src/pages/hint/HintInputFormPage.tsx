import styles from '@/styles/hint/HintInputFormPage.module.css'

function HintInputFormPage() {
  return (
    <div className={styles.margin}>
      <header>
        <div className={`FontL FontBasic`}>당신에 대해 알려주세요!</div>
        <section className={`FontS ${styles.marginTop}`}>
          <div>미션을 수행하지 않으면</div>
          <div>입력한 힌트를 마니띠에게 알려줘요.</div>
        </section>
        
      </header>
    </div>
  )
}

export default HintInputFormPage