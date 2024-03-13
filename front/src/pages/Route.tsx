import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import HomePage from './home/HomePage';
import LoginPage from './login/LoginPage';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
]);

function Route() {
  return <RouterProvider router={router} />;
}

export default Route;
