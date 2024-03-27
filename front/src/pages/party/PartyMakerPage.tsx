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
import { ArrowsCounterClockwise } from '@phosphor-icons/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function PartyMakerPage() {
  const setParty = useSetRecoilState(partyState);
  const party = useRecoilValue(partyState);
  const login = useRecoilValue(loginState);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const fetchPartyInfo = async () => {
      try {
        const usersInfo = await Axios.get(`/api/guests/all/${party.partyId}`);
        setParticipants(usersInfo.data);
      } catch (err) {
        console.log('Err :', err);
      }
    };
    fetchPartyInfo();
  }, []);

  const refreshClickHandler = async () => {
    try {
      const usersInfo = await Axios.get(`/api/guests/all/${party.partyId}`);
      setParticipants(usersInfo.data);
    } catch (err) {
      console.log('Error refreshing party info: ', err);
    }
  };

  useEffect(() => {
    console.log('party:', party);
    // Axios로 파티를 조회한다.
    // recoil에 axios response로 온 파티 정보를 저장함.

    setParty((prevPartyState) => ({
      ...prevPartyState,
      accessCode: party.accessCode,
      partyName: party.partyName,
    }));
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
        <span className={`FontM`}>
          참여 현황
          <span onClick={refreshClickHandler} className={styles.marginL}>
            <ArrowsCounterClockwise size={18} />
          </span>
        </span>
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

  const leaveHandler = () => {
    console.log('나가기');
  };

  return (
    <div className={styles.margin}>
      <header className={styles.spaceB}>
        <span className={`FontL FontBasic`}>{party.partyName} 마니또</span>
        <span>
          <ShareButton>참여 코드 공유</ShareButton>
        </span>
      </header>
      <div className={styles.cardContainer}>
        <Card {...{ tag: 4, children: children }} />
      </div>
      <div className={styles.endWrapper}>
        {/* recoil에 있는 party의 userId와 login의 userId가 같으면 */}
        {login.userId === party.userId ? (
          <>
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
          </>
        ) : (
          // recoil에 있는 party의 userId와 login의 userId가 다르면
          <span>
            <Button onClickHandler={leaveHandler} bgc="empty">
              나가기
            </Button>
          </span>
        )}
      </div>
    </div>
  );
}

export default PartyMakerPage;
