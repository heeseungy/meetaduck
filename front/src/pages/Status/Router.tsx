import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ChatDetailPage from '@/pages/chatting/ChattingDetailPage';
import ChattingPage from '@/pages/chatting/ChattingPage';
import HintInputFormPage from '@/pages/hint/HintInputFormPage';
import HintPage from '@/pages/hint/HintPage';
import LoginPage from '@/pages/login/LoginPage';
import RedirectionPage from '@/pages/login/RedirectionPage';
import MissionPage from '@/pages/mission/MissionPage';
import PartyCreatePage from '@/pages/party/PartyCreatePage';
import PartyMakerPage from '@/pages/party/PartyMakerPage';
import PartyPage from '@/pages/party/PartyPage';
import ResultPage from '@/pages/result/ResultPage';
import { currentTimeState, loginState, partyState, partyStatusState } from '@/recoil/atom';
import { useRecoilState, useRecoilValue } from 'recoil';

import ProtectedRoutes from './ProtectedRoutes';

export default function Router() {
  const login = useRecoilValue(loginState);
  const currentTime = useRecoilValue(currentTimeState);
  const setCurrentTime = useRecoilState(currentTimeState);
  const party = useRecoilValue(partyState);
  const partyStatus = useRecoilValue(partyStatusState);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/login/oauth2/code/kakao'} element={<RedirectionPage />} />

        <Route element={<ProtectedRoutes status={'login'} />}>
          <Route path={'/login'} element={<LoginPage />} />
        </Route>
        <Route element={<ProtectedRoutes status={'beforePartyjJoin'} />}>
          <Route path={'/party'} element={<PartyPage />} />
          <Route path={'/partycreate'} element={<PartyCreatePage />} />
        </Route>
        <Route element={<ProtectedRoutes status={'partyJoin'} />}>
          <Route path={'/partymaker'} element={<PartyMakerPage />} />
        </Route>
        <Route element={<ProtectedRoutes status={'hintInput'} />}>
          <Route path={'hintinputform'} element={<HintInputFormPage />} />
        </Route>
        <Route element={<ProtectedRoutes status={'partyStart'} />}>
          <Route path={'/mission'} element={<MissionPage />} />
          <Route path={'/chatting'} element={<ChattingPage />} />
          <Route path={'/chatdetail/:chatId'} element={<ChatDetailPage />} />
          <Route path={'/hint'} element={<HintPage />} />
          <Route path={'/result'} element={<ResultPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
