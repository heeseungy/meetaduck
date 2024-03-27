import { BrowserRouter, Route, Routes, ProtectedRoutes } from 'react-router-dom';

/////////////////////////////////////////////////////
import InProgress from '@/pages/Status/InProgress';
import Todo from '@/pages/Status/Todo';
///////////////////////////////////////////////////
import LoginPage from '@/pages/login/LoginPage';
import MissionPage from '@/pages/mission/MissionPage';
import PartyPage from '@/pages/party/PartyPage';
import ResultPage from '@/pages/result/ResultPage';
import HintPage from '@/pages/hint/HintPage';
import ChattingPage from '@/pages/chatting/ChattingPage';
import ChatDetailPage from '@/pages/chatting/ChattingDetailPage';

import { currentTimeState, loginState, partyState, partyStatusState } from '@/recoil/atom';
import { useRecoilState, useRecoilValue } from 'recoil';

import PartyPage from '../party/PartyPage';

function Router() {
  const login = useRecoilValue(loginState);
  const currentTime = useRecoilValue(currentTimeState);
  const setCurrentTime = useRecoilState(currentTimeState);
  const party = useRecoilValue(partyState);
  const partyStatus = useRecoilValue(partyStatusState);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes authentication={false} />}>
          <Route path={'/mission'} element={<MissionPage />} />
          <Route path={'/chatting'} element={<ChattingPage />} />
          <Route path={'/hint'} element={<HintPage />}/>
          <Route path={'/result'} element={<ResultPage/>}/>
        </Route>
        <Route />
        <Route />
        <Route />
      </Routes>
    </BrowserRouter>
  );
}
