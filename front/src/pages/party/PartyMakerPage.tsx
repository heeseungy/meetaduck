import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/commons/Button';
import Card from '@/components/commons/Card';
import DatePickerInput from '@/components/party/DatePickerInput';
import ShareButton from '@/components/party/ShareButton';
import { loginState, partyState } from '@/recoil/atom';
import { Axios } from '@/services/axios';
import { partyDeleteervice } from '@/services/partyDeleteService';
import { partyStartService } from '@/services/partyStartService';
import styles from '@/styles/party/PartyMaker.module.css';
import { ListProfile } from '@/types/user.interface';
import { ArrowsCounterClockwise } from '@phosphor-icons/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function PartyMakerPage() {
  const setParty = useSetRecoilState(partyState);
  const setLogin = useSetRecoilState(loginState);
  const party = useRecoilValue(partyState);
  const login = useRecoilValue(loginState);
  const [participants, setParticipants] = useState<ListProfile[]>([]);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPartyInfo = async () => {
      try {
        const usersInfo = await Axios.get(`/api/guests/all/${party.partyId}`);
        console.log('useInfo', usersInfo);
        setParticipants(usersInfo.data);
        return usersInfo.data;
      } catch (err) {
        console.log('Err :', err);
        return Promise.resolve(err);
      }
    };
    fetchPartyInfo().then((response: ListProfile[]) => {
      const newGuestId = response.filter((p) => p.userId === login.userId);
      if (newGuestId.length !== 0) {
        setLogin((prevLoginState) => ({
          ...prevLoginState,
          guestId: newGuestId[0].guestId,
        }));
      }
    });
  }, []);

  const refreshClickHandler = async () => {
    try {
      const usersInfo = await Axios.get(`/api/guests/all/${party.partyId}`);
      setParticipants(usersInfo.data);
    } catch (err) {
      alert(err.response.data);
      console.log('Error refreshing party info: ', err);
    }
  };

  // useEffect(() => {
  //   // Axios로 파티를 조회한다.
  //   // recoil에 axios response로 온 파티 정보를 저장함.
  //   setParty((prevPartyState) => ({
  //     ...prevPartyState,
  //     accessCode: party.accessCode,
  //     partyName: party.partyName,
  //   }));
  // }, []);

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

  const startHandler = async () => {
    try {
      const isoEndDate = endDate.toISOString();
      await Axios.patch(`/api/parties`, {
        accessCode: party.accessCode,
        endTime: isoEndDate,
        userId: party.userId,
      });
      setParty((prevPartyState) => ({
        ...prevPartyState,
        endTime: endDate !== null ? endDate : prevPartyState.endTime,
      }));
      navigate('/hintinputform');
    } catch (err) {
      console.log('err:', err);
      alert(err.response.data);
    }
  };

  const deleteHandler = async () => {
    console.log('파티닫기');
    try {
      await Axios.delete(`/api/parties`, {
        data: {
          accessCode: party.accessCode,
          userId: party.userId,
        },
      });
      alert('파티가 삭제되었습니다');
      setLogin((prevLoginState) => ({
        ...prevLoginState,
        guestId: 0,
        partyId: 0,
      }));
      // sessionStorage.removeItem('sessionStorage');
      navigate('/party');
    } catch (err) {
      alert(err.response.data);
      navigate('/party');
    }
  };

  const leaveHandler = async () => {
    console.log('나가기');
    try {
      // 로그인 상태에서 JWT 토큰을 가져옵니다.
      // const jwtToken = login.jwtToken;
      const jwtToken = 123;

      // JWT 토큰이 존재하는 경우에만 요청을 보냅니다.
      if (jwtToken) {
        await Axios.delete(`/api/guests/${login.guestId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // JWT 토큰을 헤더에 추가합니다.
          },
        });
        setLogin((prevLoginState) => ({
          ...prevLoginState,
          partyId: 0,
        }));
        alert('파티를 나갔습니다.');
        navigate('/party');
      } else {
        // JWT 토큰이 없는 경우에는 어떻게 처리할지 결정합니다.
        console.log('JWT 토큰이 없습니다.');
      }
    } catch (err) {
      alert(err.response.data);
      navigate('/party');
    }
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
              <DatePickerInput setEndDate={setEndDate} />
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
