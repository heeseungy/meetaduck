import { Link, useLocation } from 'react-router-dom';

import { ChartBar, ChatCircleDots, FlagBanner, Lightbulb } from '@phosphor-icons/react';

import classes from '../../styles/MainNav.module.css';

function MainNav() {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <nav className={classes.wrapper}>
        <div>
          <Link to="/mission">
            <FlagBanner size={32} color="#4d4637" />
          </Link>
        </div>
        <div>
          <Link to="/chatting">
            <ChatCircleDots size={32} color="#4d4637" />
          </Link>
        </div>
        <div>
          <Link to="/hint">
            <Lightbulb size={32} color="#4d4637" />
          </Link>
        </div>
        <div>
          <Link to="/result">
            <ChartBar size={32} color="#4d4637" />
          </Link>
        </div>
      </nav>
    </>
  );
}

export default MainNav;
