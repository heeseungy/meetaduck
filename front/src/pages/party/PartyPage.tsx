import { useState } from 'react';

import duckLogo from '@/assets/images/RubberDuckWithLogo.png';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import styles from '@/styles/party/Partyjoin.module.css';

function PartyPage() {
  const [usersInput, setUsersInput] = useState('');

  const joinHandler = () => {
    console.log('참여하기 클릭!');
  };

  const createHandler = () => {
    console.log('이번엔 만들기 클릭!');
  };

  const handleInputChange = (value: string) => {
    setUsersInput(value);
  };

  return (
    <div className={styles.container}>
      <img src={duckLogo} alt="duckLogo" className={styles.marginTop} />
      <div className={`FontBasic FontL ${styles.joinTitle} `}>파티 참여 코드</div>
      <div className={styles.marginTop}>
        <Input usersInput={usersInput} onChange={handleInputChange} />
      </div>
      <div className={styles.marginTop}>
        <Button bgc="filled" onClickHandler={joinHandler}>
          참여하기
        </Button>
      </div>

      <div className={styles.noPartySection}>파티가 없으신가요?</div>
      <Button bgc="empty" onClickHandler={createHandler}>
        만들기
      </Button>
    </div>
  );
}

export default PartyPage;
