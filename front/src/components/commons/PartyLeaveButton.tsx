import { useNavigate } from 'react-router-dom';

import { loginState, partyState } from '@/recoil/atom';
import { partyLeaveCompleteService } from '@/services/partyDeleteService';
import styles from '@/styles/ErrorPage.module.css';
import { SignOut } from '@phosphor-icons/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';

export default function PartyLeaveButton() {
  const setParty = useSetRecoilState(partyState);
  const login = useRecoilValue(loginState);
  const setLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();
  const partyLeave = () => {
    Swal.fire({
      icon: 'warning',
      html: '파티를 나가시겠습니까?',
      confirmButtonColor: '#eea23e',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        partyLeaveCompleteService(login.guestId)
          .then(() => {
            setLogin((prevLogin) => ({
              ...prevLogin,
              partyId: 1,
            }));
            setParty({
              partyId: 0,
              accessCode: '',
              partyName: '',
              startTime: '',
              endTime: '',
              deleted: false,
              userId: 0,
            });
            sessionStorage.removeItem('checkDate');
            sessionStorage.removeItem('finishHintInput');
            navigate('/party');
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              html: '잠시 후 다시 시도해주세요.',
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };
  return (
    <div className={`${styles.PartyLeave}`} onClick={partyLeave}>
      <SignOut size={32} color="#ffffff" />
    </div>
  );
}
