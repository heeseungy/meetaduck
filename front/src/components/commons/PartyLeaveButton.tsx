import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import voteAfter from '@/assets/images/voteAfter.png';
import { loginState, partyState } from '@/recoil/atom';
import { partyDeleteService } from '@/services/partyDeleteService';
import styles from '@/styles/commons/PartyLeaveButton.module.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';

export default function PartyLeaveButton() {
  const party = useRecoilValue(partyState);
  const setParty = useSetRecoilState(partyState);
  const login = useRecoilValue(loginState);
  const setLogin = useSetRecoilState(loginState);
  const navigate = useNavigate();
  const [btnToggle, setBtnToggle] = useState(false);
  const partyLeave = () => {
    Swal.fire({
      icon: 'warning',
      html: '파티를 삭제하시겠습니까?',
      confirmButtonColor: '#eea23e',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        partyDeleteService(party.accessCode, login.userId)
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
    <div className={`${styles.PartyLeave}`}>
      <div
        onClick={() => {
          setBtnToggle(!btnToggle);
        }}
        className={`${styles.ImageBox} ${styles.ToggleActive} ${btnToggle ? styles.ToggleActive : styles.ToggleHidden}`}
      >
        <img src={voteAfter} alt="" />
      </div>
      <div
        className={`FontS ${party.userId === login.userId ? styles.DeleteBox : styles.TextBox} ${styles.Box} ${btnToggle ? styles.ToggleTextActive : styles.ToggleTextHidden}`}
      >
        {party.userId === login.userId ? (
          <div className={`FontSTitle ${styles.Delete}`} onClick={partyLeave}>
            파티 삭제
          </div>
        ) : (
          <>
            <div>파티 주최자만</div>
            <div> 파티를 종료할 수 있어요.</div>
          </>
        )}
      </div>
    </div>
  );
}
