import { BrowserRouter, Route, Routes } from 'react-router-dom';

import InProgress from '@/pages/Status/InProgress';
import Todo from '@/pages/Status/Todo';
import ChatDetailPage from '@/pages/chatting/ChattingDetailPage';
import ChattingPage from '@/pages/chatting/ChattingPage';
import HintPage from '@/pages/hint/HintPage';
import LoginPage from '@/pages/login/LoginPage';
import MissionPage from '@/pages/mission/MissionPage';
import PartyCreatePage from '@/pages/party/PartyCreatePage';
import PartyPage from '@/pages/party/PartyPage';
import ResultPage from '@/pages/result/ResultPage';
import { currentTimeState, loginState, partyState, partyStatusState } from '@/recoil/atom';
import { useRecoilState, useRecoilValue } from 'recoil';
import PartyMakerPage from '@/pages/party/PartyMakerPage';

import ProtectedRoutes from './ProtectedRoutes';

function Router() {
  const login = useRecoilValue(loginState);
  const currentTime = useRecoilValue(currentTimeState);
  const setCurrentTime = useRecoilState(currentTimeState);
  const party = useRecoilValue(partyState);
  const partyStatus = useRecoilValue(partyStatusState);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/party'} element={<PartyPage />} />
        <Route path={'/partycreate'} element={<PartyCreatePage />} />
        <Route path={'/partymaker'} element={<PartyMakerPage />} />

        <Route element={<ProtectedRoutes authentication={false} />}>
          <Route path={'/login'} element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoutes authentication={true} />}>
          <Route path={'/mission'} element={<MissionPage />} />
          <Route path={'/chatting'} element={<ChattingPage />} />
          <Route path={'/hint'} element={<HintPage />} />
          <Route path={'/result'} element={<ResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
