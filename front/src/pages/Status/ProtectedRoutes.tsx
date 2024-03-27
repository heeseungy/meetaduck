import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  children?: ReactElement;
  authentication: boolean;
}

export default function PrivateRoute({ authentication }: PrivateRouteProps): React.ReactElement | null {
  // 로그인 했을 경우 true
  // 로그인 하지않았을 경우 null or false
  const isAuthenticated = sessionStorage.getItem('isAuthenticated');

  if (authentication) {
    // 인증 필수
    return isAuthenticated === null || isAuthenticated === 'false' ? <Navigate to="/login" /> : <Outlet />;
  } else {
    // 인증 반드시 필수 x
    return isAuthenticated === null || isAuthenticated === 'false' ? <Outlet /> : <Navigate to="/" />;
  }
}
