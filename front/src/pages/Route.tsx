import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ChatTestPage from '@/pages/chatting/ChattingDetailPage';
import ChattingPage from '@/pages/chatting/ChattingPage';
import HintPage from '@/pages/hint/HintPage';
import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/login/LoginPage';
import MissionPage from '@/pages/mission/MissionPage';
import PartyPage from '@/pages/party/PartyPage';
import ResultPage from '@/pages/result/ResultPage';
import RootPage from '@/pages/root/RootPage';
import VoteAfterPage from '@/pages/vote/VoteAfterPage';

import HintInputFormPage from './hint/HintInputFormPage';
import RedirectionPage from './login/RedirectionPage';
import PartyCreatePage from './party/PartyCreatePage';
import PartyMakerPage from './party/PartyMakerPage';
import TestPage from './webSocketTest/TestPage';
// import S3Page from './s3/s3Page';
// import { S3Page } from './s3/s3Page';
import SamplePage from './sample/SamplePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/mission', element: <MissionPage /> },
      { path: '/chatting', element: <ChattingPage /> },
      { path: '/hint', element: <HintPage /> },
      { path: '/result', element: <ResultPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/party', element: <PartyPage /> },
  { path: '/partycreate', element: <PartyCreatePage /> },
  { path: '/partymaker', element: <PartyMakerPage /> },
  { path: '/hintinputform', element: <HintInputFormPage /> },
  { path: '/voteFinish', element: <VoteAfterPage /> },
  { path: '/testpage', element: <TestPage /> },
  { path: '/chattestpage', element: <ChatTestPage /> },
  { path: '/login/oauth2/code/kakao', element: <RedirectionPage /> },
  { path: '/sample', element: <SamplePage/> },
]);

function Route() {
  return <RouterProvider router={router} />;
}

export default Route;
