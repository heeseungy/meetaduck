import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ChattingPage from './chatting/ChattingPage';
import HintPage from './hint/HintPage';
import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import MissionPage from './mission/MissionPage';
import ResultPage from './result/ResultPage';
import RootPage from './root/RootPage';
import VotePage from './vote/VotePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/mission', element: <MissionPage /> },
      { path: '/chatting', element: <ChattingPage /> },
      { path: '/hint', element: <HintPage /> },
      { path: '/vote', element: <VotePage /> },
      { path: '/result', element: <ResultPage /> },
    ],
  },
]);

function Route() {
  return <RouterProvider router={router} />;
}

export default Route;
