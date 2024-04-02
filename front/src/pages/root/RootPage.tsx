import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import PartyLeaveButton from '@/components/commons/PartyLeaveButton';
import { loginState, partyState, partyStatusState } from '@/recoil/atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';
import {partyInfoService} from '@/services/partyStartService'
import MainNav from '../../components/navbar/MainNav';

function RootPage() {
  const login = useRecoilValue(loginState);
  const setLogin = useSetRecoilState(loginState)
  const party = useRecoilValue(partyState);
  const setParty = useSetRecoilState(partyState)
  const partyStatus = useRecoilValue(partyStatusState);
  const navigate = useNavigate();
  useEffect(() => {
    partyInfoService(party.partyId).then((data)=>{
      setParty(data)
      if (data.deleted) {
        setLogin((prevLoginState) => ({
          ...prevLoginState,
          guestId: 0,
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
        })
        Swal.fire({
          icon: 'warning',
          title: '파티가 삭제되었습니다.',
          html: '파티페이지로 이동합니다.',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/party');
      }
    })
  },[]);

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
