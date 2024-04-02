import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import PartyLeaveButton from '@/components/commons/PartyLeaveButton';
import { loginState, partyState, partyStatusState } from '@/recoil/atom';
import { useRecoilValue } from 'recoil';
import Swal from 'sweetalert2';

import MainNav from '../../components/navbar/MainNav';

function RootPage() {
  const login = useRecoilValue(loginState);
  const party = useRecoilValue(partyState);
  const partyStatus = useRecoilValue(partyStatusState);
  const navigate = useNavigate();
  useEffect(() => {
    if (party.deleted) {
      Swal.fire({
        icon: 'warning',
        title: '파티가 삭제되었습니다.',
        html: '파티페이지로 이동합니다.',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/party');
    }
  });
  return (
    <>
      <div className="PartyLeaveAfterComplete">
        {partyStatus === 'Complete' ? <PartyLeaveButton /> : <></>}
      </div>
      <Outlet />
      <MainNav />
    </>
  );
}

export default RootPage;
