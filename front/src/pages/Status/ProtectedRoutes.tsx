import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  children?: ReactElement;
  status: 'login' | 'beforePartyjJoin' | 'partyJoin' | 'hintInput' | 'partyStart';
}

export default function PrivateRoute({ status }: PrivateRouteProps): React.ReactElement | null {
  // console.log(typeof sessionStorage.getItem('sessionStorage'));
  const loginState =
    sessionStorage.getItem('sessionStorage') !== null
      ? JSON.parse(sessionStorage.getItem('sessionStorage')!).loginState !== null
        ? JSON.parse(sessionStorage.getItem('sessionStorage')!).loginState
        : null
      : null;

  const partyState =
    sessionStorage.getItem('sessionStorage') !== null && sessionStorage.getItem('sessionStorage') !== undefined
      ? JSON.parse(sessionStorage.getItem('sessionStorage')!)?.partyState !== null
        ? JSON.parse(sessionStorage.getItem('sessionStorage')!)?.partyState !== undefined
          ? JSON.parse(sessionStorage.getItem('sessionStorage')!)?.partyState
          : null
        : null
      : null;

  console.log('partyState', partyState);
  const finishHintInput = sessionStorage.getItem('finishHintInput');

  if (status === 'login') {
    console.log('login');
    return loginState === null ? <Outlet /> : <Navigate to="/party" />;
  } else if (status === 'beforePartyjJoin') {
    console.log('beforePartyjJoin');
    return loginState === null ? (
      <Navigate to="/" />
    ) : partyState === null || loginState.partyId === 0 ? (
      <Outlet />
    ) : (
      <Navigate to="/partymaker" />
    );
  } else if (status === 'partyJoin') {
    console.log('partyJoin');
    return loginState === null ? (
      <Navigate to="/" />
    ) : partyState === null || loginState.partyId === 0 ? (
      <Navigate to="/party" />
    ) : partyState.endTime === (null || '') ? (
      <Outlet />
    ) : (
      <Navigate to="/hintinputform" />
    );
  } else if (status === 'hintInput') {
    console.log('hintInput');
    return loginState === null ? (
      <Navigate to="/" />
    ) : partyState === null || loginState.partyId === 0 ? (
      <Navigate to="/party" />
    ) : partyState.endTime === (null || '') ? (
      <Navigate to="/partymaker" />
    ) : finishHintInput === null ? (
      <Outlet />
    ) : (
      <Navigate to="/mission" />
    );
  } else if (status === 'partyStart') {
    return loginState === null ? (
      <Navigate to="/" />
    ) : partyState === null || loginState.partyId === 0 ? (
      <Navigate to="/party" />
    ) : partyState.endTime === (null || '') ? (
      <Navigate to="/partymaker" />
    ) : finishHintInput === null ? (
      <Navigate to="/hintinputform" />
    ) : (
      <Outlet />
    );
  } else {
    return <Navigate to="/error" />;
  }
}
