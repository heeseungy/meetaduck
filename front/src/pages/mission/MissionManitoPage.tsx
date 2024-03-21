import Card from '@/components/commons/Card';
import plusCircle from '@/assets/images/PlusCircle.png';
import styles from '@/styles/mission/Mission.module.css';
import Button from '@/components/commons/Button';


type MissionManitoProps = {
    nickname: string;
}

function MissionManitoPage(props: MissionManitoProps) {

    const uploadHandler = () => {
        console.log("사진 업로드!");
    }

    const submitHandler = () => {
        console.log("제출 완료!");
    };

    const missionContent = "손으로 그린 그림을 선물하세요."

    const children = (
        <div>
            <div className={`FontXL ${styles.Title}`}>오늘의 미션</div>
            <div className={`FontS ${styles.MissionStatus} ${styles.marginTop}`}>{props.nickname}님에게</div>
            <div className={`FontS ${styles.MissionStatus}`}>{missionContent}</div>
            <div className={`${styles.marginBottom}`}></div>
            <div className={`FontXL ${styles.Title}`}>미션 업로드</div>
            <div className={`FontS FontComment ${styles.MissionStatus} ${styles.marginTop}`}>미션을 수행한 사진을 업로드해주세요.</div>
            <div className={`${styles.uploadContainer}`}>
                <div className={`${styles.imageBox}`}>
                    <img src={plusCircle} alt="plusCircle" onClick={uploadHandler} />
                </div>
                <div className={styles.marginTop}>
                    <Button onClickHandler={submitHandler} bgc="filled">
                        제출
                    </Button>
                </div>
            </div>
        </div>
    );
    return <Card {...{ tag: 2, children: children }}></Card>;
}

export default MissionManitoPage;