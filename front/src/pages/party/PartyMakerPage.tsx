import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '@/components/commons/Button';
import Card from '@/components/commons/Card';
import LeaveButton from '@/components/commons/LeaveButton';
import DatePickerInput from '@/components/party/DatePickerInput';
import ShareButton from '@/components/party/ShareButton';
import { loginState, partyState } from '@/recoil/atom';
import { Axios } from '@/services/axios';
import { partyLeaveService } from '@/services/partyDeleteService';
import { partyInfoService } from '@/services/partyStartService';
import styles from '@/styles/party/PartyMaker.module.css';
import { Party } from '@/types/party';
import { ListProfile } from '@/types/user.interface';
import { ArrowsCounterClockwise } from '@phosphor-icons/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Swal from 'sweetalert2';

function PartyMakerPage() {
  const setParty = useSetRecoilState(partyState);
  const setLogin = useSetRecoilState(loginState);
  const party = useRecoilValue(partyState);
  const login = useRecoilValue(loginState);
  const [refreshTime, setRefreshTime] = useState('');
  const [participants, setParticipants] = useState<ListProfile[]>([]);
  const [endDate, setEndDate] = useState<string>(
    '',
    //   () => {
    //   const date = new Date(); // 현재 날짜와 시간을 가져옵니다.
    //   date.setDate(date.getDate() + 3); // 현재 날짜에 3일을 더합니다.
    //   return date.toISOString(); // ISO 8601 문자열 형식으로 변환합니다.
    // }
  );
  const [selectedHour, setSelectedHour] = useState(0); // 시간 상태 변수
  const [selectedMinute, setSelectedMinute] = useState(0); // 분 상태 변수
  const navigate = useNavigate();

  useEffect(() => {
    // 파티 목록 조회
    const fetchPartyInfo = async () => {
      try {
        const usersInfo = await Axios.get(`/api/guests/all/${party.partyId}`);
        console.log('useInfo', usersInfo);
        setParticipants(usersInfo.data);
        const currentTime = new Date();
        setRefreshTime(
          `${
            currentTime.getHours().toString().length < 2
              ? `오전 0${currentTime.getHours()}`
              : currentTime.getHours() < 12
                ? `오전 ${currentTime.getHours()}`
                : currentTime.getHours() < 22
                  ? `오후 0${currentTime.getHours() - 12}`
                  : `오후 ${currentTime.getHours() - 12}`
          }
            
            :${currentTime.getMinutes().toString().length < 2 ? `0${currentTime.getMinutes()}` : currentTime.getMinutes()}`,
        );
        return usersInfo.data;
      } catch (err) {
        console.log('Err :', err);
        return Promise.resolve(err);
      }
    };

    fetchPartyInfo()
      .then((response: ListProfile[]) => {
        const newGuestId = response.filter((p) => p.userId === login.userId);
        if (newGuestId.length !== 0) {
          setLogin((prevLoginState) => ({
            ...prevLoginState,
            guestId: newGuestId[0].guestId,
          }));
        }
      })
      .then(() => {
        partyInfoService(party.partyId)
          .then((data: Party) => {
            console.log(data);
            setParty(data);
            return data;
          })
          .then((data) => {
            if (data.endTime !== null && data.endTime !== undefined) {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: '파티가 시작됩니다.',
                showConfirmButton: false,
                timer: 1500,
              });
              // window.alert('파티가 시작됩니다.');
              navigate('/hintinputform');
            } else if (data.deleted) {
              partyLeaveService(login.guestId).then(() => {
                setParty({
                  partyId: 0,
                  accessCode: '',
                  partyName: '',
                  startTime: '',
                  endTime: '',
                  deleted: false,
                  userId: 0,
                });
                setLogin((prevLoginState) => ({
                  ...prevLoginState,
                  partyId: 0,
                }));
                Swal.fire({
                  icon: 'error',
                  title: '삭제된 파티입니다.',
                  showConfirmButton: false,
                  timer: 1500,
                });
                // window.alert('삭제된 파티입니다.');
                navigate('/party');
              });
            }
          });
      });
  }, []);

  const refreshClickHandler = async () => {
    try {
      const usersInfo = await Axios.get(`/api/guests/all/${party.partyId}`);
      setParticipants(usersInfo.data);
      const currentTime = new Date();

      setRefreshTime(
        `${
          currentTime.getHours().toString().length < 2
            ? `오전 0${currentTime.getHours()}`
            : currentTime.getHours() < 12
              ? `오전 ${currentTime.getHours()}`
              : currentTime.getHours() < 22
                ? `오후 0${currentTime.getHours() - 12}`
                : `오후 ${currentTime.getHours() - 12}`
        }
          
          :${currentTime.getMinutes().toString().length < 2 ? `0${currentTime.getMinutes()}` : currentTime.getMinutes()}`,
      );
    } catch (err) {
      // alert(err.response.data);
      console.log('Error refreshing party info: ', err);
    }
  };

  const joinNumber = participants.length;

  const children = (
    <div className={styles.cardMargin}>
      <div className={`${styles.marginBottom} `}>
        <div className={`${styles.spaceB}`}>
          <div className={`FontS ${styles.SubTitle}`}>
            참여 현황
            <div onClick={refreshClickHandler} className={styles.marginL}>
              <ArrowsCounterClockwise weight="bold" size={16} />
            </div>
          </div>
          <span className="FontS">{joinNumber}명 참여중</span>
        </div>
        <div className={`FontXS FontComment`}>최근 업데이트 {refreshTime}</div>
      </div>
      <div className={`${styles.ScrollBox}`}>
        {participants.map((participant, index) => (
          <div key={index} className={styles.participant}>
            <img src={participant.thumbnailUrl} alt="ProfileImg" className={styles.profileImage} />
            <span className={`FontS FontBasic`}>{participant.nickname}</span>
            {party.userId === participant.userId && <div className={`${styles.Badge}`}>주최자</div>}
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    console.log('selectedHour :', selectedHour);
    console.log('selectedMinute :', selectedMinute);
  }, [selectedHour, selectedMinute]);

  const startHandler = async () => {
    if (endDate === '') {
      Swal.fire({
        icon: 'error',
        html: '올바른 시간을 입력해주세요.',
        confirmButtonColor: '#eea23e',
      });
      // alert('올바른 시간을 입력해주세요.');
      return;
    } else {
      try {
        const selectedDate = new Date(endDate); // 선택한 날짜를 기반으로 Date 객체 생성
        selectedDate.setHours(selectedHour); // 선택한 시간 설정
        selectedDate.setMinutes(selectedMinute); // 선택한 분 설정

        const isoSelectedDate = selectedDate.toISOString(); // ISO 형식으로 변환

        console.log('selectedDate :', selectedDate);
        console.log('isoSelectedDate :', isoSelectedDate);

        await Axios.patch(`/api/parties`, {
          accessCode: party.accessCode,
          endTime: isoSelectedDate, // 종료 시간을 선택한 날짜와 시간으로 설정
          userId: party.userId,
        }).then(() => {
          partyInfoService(party.partyId).then((data: Party) => {
            console.log(data);
            setParty(data);
          });
        });
        // setParty((prevPartyState) => ({
        //   ...prevPartyState,
        //   endTime: isoSelectedDate, // recoil 상태에 선택한 날짜와 시간으로 설정
        // }));

        navigate('/hintinputform');
      } catch (err) {
        const { response } = err as unknown as AxiosError;
        const errMessage: string = response.data;
        console.log(errMessage);
        Swal.fire({
          icon: 'error',
          html: errMessage,
          confirmButtonColor: '#eea23e',
        });
        console.log('err:', err);
        // alert('올바른 시간을 입력해주세요.');
      }
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

      // // 파티가 삭제되었으므로, 모든 참가자를 강제로 퇴장시킵니다.
      // await Promise.all(
      //   participants.map(async (participant) => {
      //     await Axios.delete(`/api/guests/${participant.guestId}`);
      //     navigate('/party');
      //   }),
      // );
      Swal.fire({
        icon: 'error',
        html: '파티가 삭제되었습니다.',
        showConfirmButton: false,
        timer: 1500,
      });
      // alert('파티가 삭제되었습니다');
      setLogin((prevLoginState) => ({
        ...prevLoginState,
        guestId: 0,
        partyId: 0,
      }));
      navigate('/party');
    } catch (err) {
      // alert(err.response.data);
      navigate('/party');
    }
  };

  const leaveHandler = async () => {
    console.log('나가기');
    try {
      await Axios.delete(`/api/guests/${login.guestId}`);
      setLogin((prevLoginState) => ({
        ...prevLoginState,
        partyId: 0,
      }));
      Swal.fire({
        icon: 'warning',
        html: '파티를 나갔습니다.',
        showCancelButton: false,
        timer: 1500,
      });
      // alert('파티를 나갔습니다.');
      navigate('/party');
    } catch (err) {
      // alert(err.response.data);
      navigate('/party');
    }
  };

  const testHandler = () => {
    if (endDate !== '' || endDate !== null || endDate !== undefined) {
      const selectedDate = new Date(endDate); // 선택한 날짜를 기반으로 Date 객체 생성
      selectedDate.setHours(selectedHour); // 선택한 시간 설정
      selectedDate.setMinutes(selectedMinute); // 선택한 분 설정

      const isoSelectedDate = selectedDate.toISOString(); // ISO 형식으로 변환

      console.log('selectedHour :', selectedHour);
      console.log('selectedMinute :', selectedMinute);
      console.log('selectedDate :', selectedDate);
      console.log('isoSelectedDate :', isoSelectedDate);
    }
  };

  return (
    <div className={styles.margin}>
      <header className={styles.Title}>
        <span className={`FontXL FontBasic`}>{party.partyName}</span>
        <span>
          <ShareButton>참여 코드 공유</ShareButton>
        </span>
      </header>
      <Card {...{ tag: 4, children: children }} />
      <div className={styles.endWrapper}>
        {login.userId === party.userId ? (
          // recoil에 있는 party의 userId와 login의 userId가 같으면
          <>
            <div className={`FontM`}>종료 시간</div>
            <div className={`${styles.inputWrapper}`}>
              <DatePickerInput setEndDate={setEndDate} />
              <div className={styles.timeSelection}>
                <div>
                  <select
                    className={`${styles.selectBox}`}
                    value={selectedHour}
                    onChange={(e) => setSelectedHour(parseInt(e.target.value))}
                  >
                    {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                      <option key={hour} value={hour}>
                        {`${hour}`.padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  시
                </div>
                <div>
                  <select
                    className={`${styles.selectBox}`}
                    value={selectedMinute}
                    onChange={(e) => setSelectedMinute(parseInt(e.target.value))}
                  >
                    {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                      <option key={minute} value={minute}>
                        {`${minute}`.padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                  분
                </div>
              </div>
            </div>
            <div className={`${styles.buttonWrapper}`}>
              <span className={`${styles.oneButton}`}>
                <Button onClickHandler={startHandler} bgc="filled">
                  {/* <Button onClickHandler={testHandler} bgc="filled"> */}
                  시작하기
                </Button>
              </span>
              <span>
                <Button onClickHandler={deleteHandler} bgc="empty">
                  파티삭제
                </Button>
              </span>
            </div>
          </>
        ) : (
          // recoil에 있는 party의 userId와 login의 userId가 다르면
          <span className={styles.marginTop}>
            <Button onClickHandler={leaveHandler} bgc="empty">
              파티떠나기
            </Button>
          </span>
        )}
      </div>
    </div>
  );
}

export default PartyMakerPage;
