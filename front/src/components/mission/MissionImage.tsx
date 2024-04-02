import missionAfter from '@/assets/images/missionAfter.png';
import styles from '@/styles/mission/MissionCompletePage.module.css';
import { MissionResult } from '@/types/mission';

interface MissionImageProps {
  day: number;
  mission: MissionResult[];
  nickname: string;
}
function MissionImage({ day, mission, nickname }: MissionImageProps) {
  return (
    <div>
      <div className={`${styles.MissionDate} ${styles.CardTitle}`}>
        <div className={`FontMTitle FontBasic`}>{day+1}일차</div>
        <div className={`FontXS FontBasic ${styles.MissionContentBox}`}>
          <div>{nickname}님에게 </div>
          <div>{mission[day].missionContent}</div>
        </div>
      </div>
      <div>
        {mission[day].missionImageUrl != null ? (
          <img className={styles.ImageBox} src={mission[day].missionImageUrl!} alt="" />
        ) : (
          <div className={styles.ImageBox}>
            <img src={missionAfter} alt="" />
            <div className="FontXS">미션을 수행하지 못했어요</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MissionImage;
