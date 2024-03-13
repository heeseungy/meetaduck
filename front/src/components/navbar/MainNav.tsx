import { Link } from "react-router-dom";
import classes from '../../styles/MainNav.module.css';

function MainNav() {
  return (
    <>
      <nav className={classes.wrapper}>
        {/* <div>아래에 있는 것들은 네비게이션 바 입니다.</div> */}
        <div><Link to="/mission">미션</Link></div>
        <div><Link to="/chatting">채팅</Link></div>
        <div><Link to="/hint">힌트</Link></div>
        <div><Link to="/result">결과</Link></div>
      </nav>
    </>
  )
}

export default MainNav