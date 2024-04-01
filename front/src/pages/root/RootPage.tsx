import { Outlet } from 'react-router-dom';

import PartyLeaveButton from '@/components/commons/PartyLeaveButton';
import { partyStatusState } from '@/recoil/atom';
import { useRecoilValue } from 'recoil';

import MainNav from '../../components/navbar/MainNav';

function RootPage() {
  const partyStatus = useRecoilValue(partyStatusState);
  return (
    <>
      <div className='PartyLeaveAfterComplete'>{partyStatus === 'Complete' ? <PartyLeaveButton /> : <></>}</div>
      <Outlet />
      <MainNav />
    </>
  );
}

export default RootPage;
