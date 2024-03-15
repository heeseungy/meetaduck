import { ReactNode } from 'react';

import backgroundDuck from '@/assets/images/backgroundDuck.png';
import styles from '@/styles/commons/Card.module.css';

type CardPorps = {
  tag: number;
  children: ReactNode;
};

function Card(cardProps: CardPorps) {
  if (cardProps.tag === 1) {
    return (
      <div className={styles.CardContainer}>
        <img className={styles.BackgroundDuck} src={backgroundDuck} alt="duck" />
        <div className={`${styles.Card1} ${styles.Card}`}>
          <div className={styles.CardContent}>{cardProps.children}</div>
        </div>
      </div>
    );
  } else if (cardProps.tag === 2) {
    return (
      <div className={styles.CardContainer}>
        <div className={`${styles.Card2} ${styles.Card}`}>
          <div className={styles.CardContent}>{cardProps.children}</div>
        </div>
      </div>
    );
  } else if (cardProps.tag === 3) {
    return (
      <div className={styles.CardContainer}>
        <div className={`${styles.Card3} ${styles.Card}`}>
          <div className={styles.CardContent}>{cardProps.children}</div>
        </div>
      </div>
    );
  } else if (cardProps.tag === 4) {
    return (
      <div className={styles.TopCardContainer}>
        <div className={`${styles.Card4} ${styles.PartyCard}`}>
          <div className={styles.CardContent}>{cardProps.children}</div>
        </div>
      </div>
    );
  }
}

export default Card;
