import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  children?: ReactElement;
  status: 'login' | 'beforePartyjJoin' | 'partyJoin' | 'hintInput' | 'partyStart';
}

export default function PrivateRoute({ status }: PrivateRouteProps): React.ReactElement | null {
  // console.log(typeof sessionStorage.getItem('sessionStorage'));
  const loginState =
    sessionStorage.getItem('sessionStorage') !== null && sessionStorage.getItem('sessionStorage') !== undefined
      ? JSON.parse(sessionStorage.getItem('sessionStorage')!).loginState !== null
        ? JSON.parse(sessionStorage.getItem('sessionStorage')!).loginState !== undefined
          ? JSON.parse(sessionStorage.getItem('sessionStorage')!).loginState
          : null
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
    // login, redirection
    console.log('login');
    if (loginState === null) {
      //loginState에 값이 null 이면 login page || redirection page
      return <Outlet />;
    } else {
      //loginState에 값이 있으면 party page로 이동
      return <Navigate to="/party" />;
    }
  } else if (status === 'beforePartyjJoin') {
    // party, partycreate
    console.log('beforePartyjJoin');
    if (loginState === null) {
      //loginState에 값이 null 이면 login page
      return <Navigate to="/" />;
    } else if (partyState === null || loginState.partyId === 0 || loginState.partyId === 1) {
      // partyState가 없는 경우 혹은 partyId가 0일 경우 party Page partycreate page
      return <Outlet />;
    } else {
      // 그외 partymaker로 이동
      return <Navigate to="/partymaker" />;
    }
  } else if (status === 'partyJoin') {
    // partymaker
    console.log('partyJoin');
    if (loginState === null) {
      //loginState에 값이 null 이면 login page || redirection page
      return <Navigate to="/" />;
    } else if (partyState === null || loginState.partyId === 0 || loginState.partyId === 1) {
      // partyState가 없는 경우 혹은 partyId가 0일 경우 party Page
      return <Navigate to="/party" />;
    } else if (partyState.endTime === null || partyState.endTime === '') {
      return <Outlet />;
    } else {
      return <Navigate to="/hintinputform" />;
    }
  } else if (status === 'hintInput') {
    // hintinputform
    console.log('hintInput');
    if (loginState === null) {
      //loginState에 값이 null 이면 login page || redirection page
      return <Navigate to="/" />;
    } else if (partyState === null || loginState.partyId === 0 || loginState.partyId === 1) {
      // partyState가 없는 경우 혹은 partyId가 0일 경우 party Page
      return <Navigate to="/party" />;
    } else if (partyState.endTime === null || partyState.endTime === '') {
      return <Navigate to="/partymaker" />;
    } else if (finishHintInput === null) {
      return <Outlet />;
    } else {
      return <Navigate to="/mission" />;
    }
  } else if (status === 'partyStart') {
    // mission chat hint result vote
    if (loginState === null) {
      //loginState에 값이 null 이면 login page || redirection page
      return <Navigate to="/" />;
    } else if (partyState === null || loginState.partyId === 0 || loginState.partyId === 1) {
      // partyState가 없는 경우 혹은 partyId가 0일 경우 party Page
      return <Navigate to="/party" />;
    } else if (partyState.endTime === null || partyState.endTime === '') {
      return <Navigate to="/partymaker" />;
    } else if (finishHintInput === null) {
      return <Navigate to="/hintinputform" />;
    } else {
      return <Outlet />;
    }
  } else {
    return <Navigate to="/error" />;
  }
}
