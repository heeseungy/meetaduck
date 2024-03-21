import VoteRadioButtonProfileName from '@/components/vote/VoteRadioButtonProfileName';
import styles from '@/styles/vote/VoteRadioButton.module.css';
import { VoteRadioButtonProps } from '@/types/vote';

function VoteRadioButton({ candidate, id, name, checked, ...rest }: VoteRadioButtonProps) {
  return (
    <div
      className={`
    ${styles.FlexHorizontal} 
    ${styles.SpaceBetween} 
    ${styles.RadioButtonContainer}
    ${checked ? styles.RadioButtonChecked : styles.RadioButtonUnchecked}
    `}
    >
      <label htmlFor={id}>
        <VoteRadioButtonProfileName
          {...{
            nickname: candidate.nickname,
            thumbnailUrl: candidate.thumbnailUrl,
          }}
        />
      </label>
      <input type="radio" id={id} value={candidate.guestId} name={name} checked={checked} {...rest} />
    </div>
  );
}

export default VoteRadioButton;
