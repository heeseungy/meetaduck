import { CopyToClipboard } from 'react-copy-to-clipboard';

import { partyState } from '@/recoil/atom';
import styles from '@/styles/party/PartyMaker.module.css';
import { useRecoilValue } from 'recoil';

interface PropType {
  children: string;
}

function ShareButton({ children }: PropType) {
  const party = useRecoilValue(partyState);
  const accessCode = party.accessCode;

  return (
    <CopyToClipboard text={accessCode} onCopy={() => alert('클립보드에 복사되었습니다.')}>
      <button className={`FontS ${styles.share}`}>{children}</button>
    </CopyToClipboard>
  );
}

export default ShareButton;
