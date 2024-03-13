import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';
import ResultPage from './result/ResultPage';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/result', element: <ResultPage /> },
]);

function Route() {
  return <RouterProvider router={router} />;
}

export default Route;
