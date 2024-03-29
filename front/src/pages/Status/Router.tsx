import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ErrorPage from '@/pages/Status/ErrorPage';
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
import RootPage from '@/pages/root/RootPage';
import RabbitTestPage from '@/pages/webSocketTest/RabbitTestPage';

import ProtectedRoutes from './ProtectedRoutes';

export default function Router() {


  return (
    <BrowserRouter>
      <Routes>
        <Route></Route>
        <Route path={'/'} element={<ProtectedRoutes status={'login'} />}>
          <Route index element={<LoginPage />} />
          <Route path={'/login/oauth2/code/kakao'} element={<RedirectionPage />} />
        </Route>
        <Route path={'/party'} element={<ProtectedRoutes status={'beforePartyjJoin'} />}>
          <Route index element={<PartyPage />} />
          <Route path={'/party/create'} element={<PartyCreatePage />} />
        </Route>
        <Route path={'/partymaker'} element={<ProtectedRoutes status={'partyJoin'} />}>
          <Route index element={<PartyMakerPage />} />
        </Route>
        <Route path={'/hintinputform'} element={<ProtectedRoutes status={'hintInput'} />}>
          <Route index element={<HintInputFormPage />} />
        </Route>
        <Route element={<ProtectedRoutes status={'partyStart'} />}>
          <Route element={<RootPage />}>
            <Route index path={'/mission'} element={<MissionPage />} />
            <Route path={'/chatting'} element={<ChattingPage />} />
            <Route path={'/hint'} element={<HintPage />} />
            <Route path={'/result'} element={<ResultPage />} />
          </Route>
          <Route path={'/chatdetail/:chatId'} element={<ChatDetailPage />} />
        </Route>
        <Route path={'/rabbit'} element={<RabbitTestPage />} />
        <Route path={'*'} element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
