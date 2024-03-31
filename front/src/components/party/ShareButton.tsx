import { CopyToClipboard } from 'react-copy-to-clipboard';

import { partyState } from '@/recoil/atom';
import styles from '@/styles/party/PartyMaker.module.css';
import { useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';

interface PropType {
  children: string;
}

function ShareButton({ children }: PropType) {
  const party = useRecoilValue(partyState);
  const accessCode = party.accessCode;
  // alert('클립보드에 복사되었습니다.')}

  return (
    <CopyToClipboard
      text={accessCode}
      onCopy={() =>
        Swal.fire({
          icon: 'info',
          html: '클립보드가 복사되었습니다.',
          showConfirmButton: false,
          timer: 1000,
        })
      }
    >
      <button className={`FontS ${styles.share}`}>{children}</button>
    </CopyToClipboard>
  );
}

export default ShareButton;
