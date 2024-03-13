import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import ResultPage from './result/ResultPage';
import RootPage from './root/RootPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/result', element: <ResultPage /> },
      { path: '/login', element: <LoginPage /> },
    ],
  },
]);

function Route() {
  return <RouterProvider router={router} />;
}

export default Route;
