import { Link, useLocation } from 'react-router-dom';

import { ChartBar, ChatCircleDots, FlagBanner, Lightbulb } from '@phosphor-icons/react';

import styles from '../../styles/MainNav.module.css';

function MainNav() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <nav className={styles.wrapper}>
        <div>
          <Link to="/mission">
            {location.pathname === '/mission' ? (
              <>
                <div className={`${styles.BarMission} ${styles.UnderBar}`}></div>
                <FlagBanner size={32} weight="fill" color="#ffd656" />
              </>
            ) : (
              <FlagBanner size={32} color="#4d4637" />
            )}
          </Link>
        </div>
        <div>
          <Link to="/chatting">
            {location.pathname === '/chatting' ? (
              <>
                <div className={`${styles.BarChatting} ${styles.UnderBar}`}></div>
                <ChatCircleDots size={32} weight="fill" color="#ffd656" />
              </>
            ) : (
              <ChatCircleDots size={32} color="#4d4637" />
            )}
          </Link>
        </div>
        <div>
          <Link to="/hint">
            {location.pathname === '/hint' ? (
              <>
                <div className={`${styles.BarHint} ${styles.UnderBar}`}></div>
                <Lightbulb size={32} weight="fill" color="#ffd656" />
              </>
            ) : (
              <Lightbulb size={32} color="#4d4637" />
            )}
          </Link>
        </div>
        <div>
          <Link to="/result">
            {location.pathname === '/result' ? (
              <>
                <div className={`${styles.BarResult} ${styles.UnderBar}`}></div>
                <ChartBar size={32} weight="fill" color="#ffd656" />
              </>
            ) : (
              <ChartBar size={32} color="#4d4637" />
            )}
          </Link>
        </div>
      </nav>
    </>
  );
}

export default MainNav;
