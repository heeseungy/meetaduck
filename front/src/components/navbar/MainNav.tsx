import { Link } from "react-router-dom"

function MainNav() {
  return (
    <>
      <nav>
        <div>아래에 있는 것들은 네비게이션 바 입니다.</div>
        <ul>
          <li><Link to="#">미션</Link></li>
          <li><Link to="#">채팅</Link></li>
          <li><Link to="#">힌트</Link></li>
          <li><Link to="/result">결과</Link></li>
        </ul>
      </nav>
    </>
  )
}

export default MainNav