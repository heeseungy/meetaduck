import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Button from '@/components/commons/Button';
import Card from '@/components/commons/Card';
import DatePickerInput from '@/components/party/DatePickerInput';
import ShareButton from '@/components/party/ShareButton';
import { loginState, partyState } from '@/recoil/atom';
import { Axios } from '@/services/axios';
import { partyDeleteervice } from '@/services/partyDeleteService';
import { partyStartService } from '@/services/partyStartService';
import styles from '@/styles/party/PartyMaker.module.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';

// export const PARTY1: Party = {
//   partyId: -1,
//   accessCode: '',
//   startTime: '',
//   endTime: '',
//   deleted: false,
//   userId: -1,
// };

function PartyMakerPage() {
  const setParty = useSetRecoilState(partyState);
  const party = useRecoilValue(partyState);
  const login = useRecoilValue(loginState);

  const location = useLocation();
  const { accessCode, partyName, partyId } = location.state;
  console.log('location.state: ', location.state);

  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchPartyInfo = async () => {
      try {
        const partyInfoRes = await Axios.get(`/api/guests/all/${partyId}`);
        console.log('partyInfoRes.data :', partyInfoRes.data);
        setParticipants(partyInfoRes.data);
      } catch (err) {
        console.log('Err :', err);
      }
    };
    fetchPartyInfo();
  }, []);

  const refreshClickHandler = () => {
    Axios.get(`/api/guests/all/${partyId}`);
  };

  useEffect(() => {
    console.log(party);
    // Axios로 파티를 조회한다.
    // recoil에 axios response로 온 파티 정보를 저장함.
    // setParty({
    //   partyId: response.data.partyId,
    //   accessCode: response.data.accessCode,
    //   startTime: response.data.startTime,
    //   endTime: response.data.endTime,
    //   deleted: response.data.deleted,
    //   userId: response.data.userId,
    // });

    setParty((prevPartyState) => ({
      ...prevPartyState,
      accessCode: accessCode,
      partyName: partyName,
    }));
    // setParty({
    //   partyId: 3,
    //   accessCode: 'tlz5vy',
    //   startTime: '2024-03-11T21:00:00.000Z',
    //   endTime: '2024-03-20T21:00:00.000Z',
    //   deleted: false,
    //   userId: 152,
    // });
  }, []);

  useEffect(() => {
    // login State 가져와서 같은지 확인
    console.log('login.userId: ', login.userId);
    console.log(party.userId);
  }, [party]);

  const joinNumber = participants.length;

  const children = (
    <div className={styles.cardMargin}>
      <div className={`${styles.marginBottom} ${styles.spaceB}`}>
        <span className={`FontM`}>참여 현황</span>
        <span>{joinNumber}명 창여중</span>
      </div>
      {participants.map((participant, index) => (
        <div key={index} className={styles.participant}>
          <img src={participant.thumbnailUrl} alt="ProfileImg" className={styles.profileImage} />
          <span className={styles.nickname}>{participant.nickname}</span>
        </div>
      ))}
    </div>
  );

  const startHandler = () => {
    console.log('시작하기');
    partyStartService();
  };

  const deleteHandler = () => {
    console.log('파티닫기');
    partyDeleteervice();
  };
  return (
    <div className={styles.margin}>
      <header className={styles.spaceB}>
        <span className={`FontL FontBasic`}>{partyName} 마니또</span>
        <span>
          <ShareButton>참여 코드 공유</ShareButton>
        </span>
      </header>
      <div className={styles.cardContainer}>
        <Card {...{ tag: 4, children: children }} />
      </div>
      <div className={styles.endWrapper}>
        <div className={`FontM`}>종료 시간</div>
        <div className={`${styles.inputWrapper}`}>
          <DatePickerInput />
        </div>
        <div className={`${styles.buttonWrapper}`}>
          <span className={`${styles.oneButton}`}>
            <Button onClickHandler={startHandler} bgc="filled">
              시작하기
            </Button>
          </span>
          <span>
            <Button onClickHandler={deleteHandler} bgc="empty">
              파티닫기
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PartyMakerPage;
