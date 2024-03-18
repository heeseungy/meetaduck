import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <h1>Hi I am Dummy Home Page</h1>
      <p><Link to="/login">로그인 페이지</Link>로 이동</p>
      <p><Link to="/mission">미션 페이지</Link>로 이동</p>
      <p><Link to="/chatting">채팅 페이지</Link>로 이동</p>
      <p><Link to="/hint">힌트 페이지</Link>로 이동</p>
      <p><Link to="/result">결과 페이지</Link>로 이동</p>
      <p><Link to="/party">파티 페이지</Link>로 이동</p>
      <p><Link to="/partycreate">파티 만들기 페이지</Link>로 이동</p>
      <p><Link to="/partymaker">파티 방장전용 페이지</Link>로 이동</p>
      <p><Link to="/partyjoiner">파티 참여자전용 페이지</Link>로 이동</p>
      <p><Link to="/hintinputform">힌트 정보 입력 페이지</Link>로 이동</p>
      <p><Link to="/testpage">희승's 테스트 페이지</Link>로 이동</p>
      <p>testing</p>
    </> 
  )
}

export default HomePage;