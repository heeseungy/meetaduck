import { useState } from 'react';
import ReactCodeInput from 'react-code-input';
import { useNavigate } from 'react-router-dom';

import duckLogo from '@/assets/images/RubberDuckWithLogo.png';
import Button from '@/components/commons/Button';
import { loginState, partyState } from '@/recoil/atom';
import { Axios } from '@/services/axios';
import styles from '@/styles/party/Partyjoin.module.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';

function PartyPage() {
  const [usersInput, setUsersInput] = useState('');
  const navigate = useNavigate();
  const login = useRecoilValue(loginState);
  const setParty = useSetRecoilState(partyState);
  const setLogin = useSetRecoilState(loginState);
  const party = useRecoilValue(partyState);

  const joinHandler = async () => {
    console.log('참여하기 클릭!');
    const accessCode = usersInput;
    const userId = login.userId;
    try {
      console.log(sessionStorage.getItem('JWT'));
      const response = await Axios.get(`api/parties/${accessCode}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('JWT')}`,
        },
      });
      console.log(response);
      setParty((prevPartyState) => ({
        ...prevPartyState,
        accessCode: accessCode,
        partyId: response.data.partyId,
      }));
      setLogin((prevLoginState) => ({
        ...prevLoginState,
        partyId: response.data.partyId,
      }));
      navigate('/partymaker');
    } catch (err) {
      Swal.fire({
        icon: 'error',
        html: '입력 코드가 올바르지 않습니다',
        confirmButtonColor: '#eea23e',
      });
      console.log('err :', err);
    }
  };

  const createHandler = async () => {
    navigate('/party/create');
  };

  const handleInputChange = (value: string) => {
    setUsersInput(value);
  };

  const props = {
    inputStyle: {
      fontFamily: 'JalnanGothic',
      fontSize: '28px',
      margin: '4px',
      width: '30px',
      height: '30px',
      paddingTop: '10px',
      paddingLeft: '12px',
      paddingRight: '0px',
      paddingBottom: '5px',
      boxShadow: 'white 0px 0px 0px 0px',
      borderRadius: '6px',
      border: '1px solid #b3aa99',
      color: '#4D4637',
      backgroundColor: 'white',
      outline: 'none',
    },
  };
  return (
    <div className={styles.container}>
      <img src={duckLogo} alt="duckLogo" className={styles.marginTop} />
      <div className={`FontBasic FontL ${styles.joinTitle} `}>파티 참여 코드</div>
      <div className={`${styles.FontCode} ${styles.marginTop}`}>
        <ReactCodeInput
          type="text"
          value={usersInput}
          onChange={handleInputChange}
          fields={6}
          name="accessCode"
          inputMode="verbatim"
          {...props}
        />
      </div>
      <div className={styles.marginTop}>
        <Button bgc="filled" onClickHandler={joinHandler}>
          참여하기
        </Button>
      </div>

      <div className={`FontSBold FontComment ${styles.noPartySection}`}>파티가 없으신가요?</div>
      <Button bgc="empty" onClickHandler={createHandler}>
        만들기
      </Button>
    </div>
  );
}

export default PartyPage;
