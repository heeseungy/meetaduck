import { Outlet } from 'react-router-dom';

import MainNav from '../../components/navbar/MainNav';

function RootPage() {
  return (
    <>
      <Outlet />
      <MainNav />
    </>
  );
}

export default RootPage;
