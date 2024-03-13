import { Link } from "react-router-dom"

function MainNav() {
  return (
    <>
      <nav>
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