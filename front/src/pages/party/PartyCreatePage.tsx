import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import duckLogo from '@/assets/images/RubberDuckWithLogo.png';
import Button from '@/components/commons/Button';
import Input from '@/components/commons/Input';
import { loginState, partyState } from '@/recoil/atom';
import { Axios } from '@/services/axios';
import style from '@/styles/commons/Input.module.css';
import styles from '@/styles/party/Partyjoin.module.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';

function PartyCreatePage() {
  const [partyName, setPartyName] = useState('');
  const navigate = useNavigate();

  const login = useRecoilValue(loginState);
  const party = useRecoilValue(partyState);

  const setLogin = useSetRecoilState(loginState);
  const setParty = useSetRecoilState(partyState);
  const createHandler = async () => {
    if (partyName === '') {
      Swal.fire({
        icon: 'error',
        html: '파티 이름을 입력해주세요.',
        confirmButtonColor: '#eea23e',
      });
      return;
    }
    try {
      console.log(sessionStorage.getItem('JWT'));
      const response = await Axios.post(
        '/api/parties',
        {
          partyName: partyName,
          userId: login.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
          },
        },
      );

      if (response.data.partyId === 1) {
        return;
      } else {
        setLogin((prevLoginState) => ({
          ...prevLoginState,
          partyId: response.data.partyId,
        }));
        setParty(() => ({
          accessCode: response.data.accessCode,
          partyName: partyName,
          userId: login.userId,
          partyId: response.data.partyId,
          endTime: '',
          startTime: '',
          deleted: false,
        }));
        navigate('/partymaker');
      }
    } catch (err) {
      console.log(err);
      // alert(err);
    }
  };

  const backHandler = async () => {
    navigate('/party');
  };
  useEffect(() => {
    console.log('party.partyId :', party.partyId);
  }, [party]);

  const handleInputChange = (value: string) => {
    setPartyName(value);
  };

  return (
    <div className={styles.container}>
      <img src={duckLogo} alt="duckLogo" className={styles.marginTop} />
      <div className={`FontBasic FontL ${styles.joinTitle} `}>파티명</div>
      <div className={`${styles.marginTop}`}>
        <Input className={style.partyBox} maxLength={5} usersInput={partyName} onChange={handleInputChange} />
      </div>
      <div className={`${styles.buttonGap} ${styles.marginTop}`}>
        <Button onClickHandler={backHandler} bgc="empty">
          돌아가기
        </Button>
        <Button onClickHandler={createHandler} bgc="filled">
          파티열기
        </Button>
      </div>
    </div>
  );
}

export default PartyCreatePage;
