import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  children?: ReactElement;
  status: 'login' | 'beforePartyjJoin' | 'partyJoin' | 'hintInput' | 'partyStart';
}

export default function PrivateRoute({ status }: PrivateRouteProps): React.ReactElement | null {
  // 로그인 했을 경우 true
  // 로그인 하지않았을 경우 null or false
  console.log(typeof sessionStorage.getItem('sessionStorage'));
  const loginState =
    sessionStorage.getItem('sessionStorage') !== null
      ? JSON.parse(sessionStorage.getItem('sessionStorage')!).loginState !== null
        ? JSON.parse(sessionStorage.getItem('sessionStorage')!).loginState
        : null
      : null;

  const partyState =
    sessionStorage.getItem('sessionStorage') !== null
      ? JSON.parse(sessionStorage.getItem('sessionStorage')!).partyState !== null
        ? JSON.parse(sessionStorage.getItem('sessionStorage')!).partyState
        : null
      : null;

  // hintInput하면 sessionStorage에 값이 들어가게 만들기
  // atom sessionStorage party, login 2개로 나누기
  // partyState왜 안되는지 확인하기
  // hintInputForm부터 다시 return 이후 조건문 만들기
  
  const finishHintInput = sessionStorage.getItem('finishHintInput');

  if (status === 'login') {
    console.log('login');
    return loginState === null ? <Outlet /> : <Navigate to="/party" />;
  } else if (status === 'beforePartyjJoin') {
    console.log('beforePartyjJoin');
    return loginState === null ? (
      <Navigate to="/login" />
    ) : partyState === null || loginState.partyId === null ? (
      <Outlet />
    ) : (
      <Navigate to="/partymaker" />
    );
  } else if (status === 'partyJoin') {
    console.log('partyJoin');
    return loginState === null ? (
      <Navigate to="/login" />
    ) : partyState === null || loginState.partyId === null ? (
      <Navigate to="/party" />
    ) : partyState.endTime === '' ? (
      <Outlet />
    ) : (
      <Navigate to="/hintinputform" />
    );
  } else if (status === 'hintInput') {
    console.log('hintInput');
    // 아직 덜함
    return finishHintInput === null ? <Outlet /> : <Navigate to="/mission" />;
  } else if (status === 'partyStart') {
    return <Outlet />;
    // 인증 반드시 필수 x
    // return isAuthenticated === null || isAuthenticated === 'false' ? <Outlet /> : <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
}

// 로그인 X-> 로그인페이지
// 파티 X -> 파티 참가 페이지
// 파티 O -> 파티 status확인
// 파티 status가 Todo -> 파티 대기 페이지
// 파티 status가 InProgress나 그외 -> 미션 페이지
