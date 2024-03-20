import { useEffect } from 'react';

import { loginService } from '@/services/loginService';

function RedirectionPage() {
  const code = new URLSearchParams(window.location.search).get('code');

  useEffect(() => {
    // console.log(process.env.REACT_APP_URL);
    if (code) {
      loginService(code);
    } else {
      console.log('code 없음');
    }
  }, []);

  return <div>로그인 중입니다.</div>;
}

export default RedirectionPage;
