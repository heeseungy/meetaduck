// React 및 React Router 라이브러리에서 필요한 훅들을 임포트합니다.
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 프로젝트 내 컴포넌트 및 서비스, 스타일, 타입, 상태 관리 라이브러리(Recoil)를 임포트합니다.
import Card from '@/components/commons/Card';
import HintInputQuestion from '@/components/hint/HintInputQuestion';
import { loginState } from '@/recoil/atom';
// Recoil을 이용한 상태 관리에서 사용되는 loginState 상태
// 힌트 페이지 관련 서비스 로직을 처리하는 함수
import styles from '@/styles/hint/HintInputFormPage.module.css';
// CSS 모듈 스타일
// 힌트 관련 타입 정의
import { useRecoilValue } from 'recoil';

// Recoil 상태를 읽기 위한 훅

// 힌트 입력 폼 페이지 컴포넌트 정의
function HintInputFormPage() {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅
  const login = useRecoilValue(loginState); // Recoil을 통해 로그인 상태를 가져옴

  // 컴포넌트가 마운트되었을 때 실행될 useEffect 훅
  useEffect(() => {
    // 이미 mission 페이지로 리디렉션한 경우, 이를 방지
    if (sessionStorage.getItem('finishHintInput') === 'true') {
      navigate('/mission');
      // return;
    }

    // hintPageService(login.guestId)
    //   .then((data: Answer[]) => {
    //     console.log(data);
    //     if (
    //       data &&
    //       data[0].hintStatusAnswer !== undefined &&
    //       data[0].hintStatusAnswer !== null &&
    //       data[0].hintStatusAnswer !== ''
    //     ) {
    //       console.log(data);
    //       sessionStorage.setItem('finishHintInput', 'true'); // 세션 스토리지 설정
    //       // navigate('/mission'); // 조건이 만족되면 리디렉션
    //     }
    //     return data;
    //   })
    //   .then((data) => {
    //     if (
    //       data &&
    //       data[0].hintStatusAnswer !== undefined &&
    //       data[0].hintStatusAnswer !== null &&
    //       data[0].hintStatusAnswer !== ''
    //     ) {
    //       navigate('/mission');
    //     }
    //   });
    // }, [login.guestId]); // 의존성 배열 수정
  }, []);

  // 페이지에 렌더링될 자식 컴포넌트들을 변수에 할당
  const children = (
    <div className={styles.cardMargin}>
      {/* <form action="#"> */}
      <HintInputQuestion />
      {/* </form> */}
    </div>
  );

  // 실제로 페이지에 렌더링될 JSX 반환
  return (
    <div>
      <header className={styles.Header}>
        <div className={`FontL FontBasic`}>당신에 대해 알려주세요!</div>
        <section className={`FontSBold ${styles.marginTop}`}>
          <div>미션을 수행하지 않으면</div>
          <div>입력한 힌트를 마니띠에게 알려줘요.</div>
        </section>
      </header>
      <Card {...{ tag: 1, children: children }} />
    </div>
  );
}

export default HintInputFormPage; // HintInputFormPage 컴포넌트를 기본으로 내보냄
