import styles from '@/styles/vote/VoteRadioButton.module.css';
import { RadioBtnGroupProps } from '@/types/vote';

import VoteRadioButton from './VoteRadioButton';

const VoteRadioButtonList = ({ partyList, onChange, value }: RadioBtnGroupProps) => {
  function renderPartyList() {
    return (
      <div className={styles.ScrollContainer}>
        {partyList.map((it) => {
          const radioBtnId = `${it.guestId}-${it.nickname}`;
          const isChecked = value === it.guestId;
          return (
            <VoteRadioButton
              candidate={it}
              key={it.guestId}
              id={radioBtnId}
              name="vote"
              onChange={onChange}
              checked={isChecked}
            />
          );
        })}
      </div>
    );
  }
  return <>{renderPartyList()}</>;
};
export default VoteRadioButtonList;
