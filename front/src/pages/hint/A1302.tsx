import hint from '@/assets/images/hint.png';
import Card from '@/components/commons/Card';
import styles from '@/styles/hint/HintPage.module.css';

type A1302Props = {
  nickname: string;
};

function A1302(props: A1302Props) {
  const children = (
    <div>
      <div className={styles.Title}>
        <div className={`FontL`}>마니또 힌트</div>
        <div className="FontSTitle">{props.nickname}님의 마니또는 누구일까요?</div>
      </div>
      <div className={styles.Containter}>
        <img className={styles.HintImage} src={hint} alt="hint" />
        <div className={`FontSBold ${styles.Text}`}>
          <p>마니또가 열심히</p> <p>미션을 수행하고 있어요🥰</p>
        </div>
      </div>
    </div>
  );
  return <Card {...{ tag: 2, children: children }}></Card>;
}

export default A1302;
