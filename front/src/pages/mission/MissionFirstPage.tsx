import arrowButton from '@/assets/images/ArrowButton.png';

import Card from '@/components/commons/Card';

import styles from '@/styles/mission/Mission.module.css';

type MissionFirstProps = {
    nickname: string;
}

function MissionFirstPage(props: MissionFirstProps) {
    
    const checkHandler = () => {
        console.log("미션 확인!");
    };

    const children = (
        <div className={`${styles.checkContainer}`}>
            <div className={`${styles.marginBottom}`}>
                <div className={`FontXL`}>{props.nickname}님의</div>
                <div className={`FontXL`}>오늘의 미션은...</div>
            </div>
            <img src={arrowButton} alt="arrowButton" onClick={checkHandler}/>
        </div>
    );
    return <Card {...{ tag: 1, children: children }}></Card>;
}

export default MissionFirstPage;