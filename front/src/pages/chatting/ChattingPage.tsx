import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import groupChat from '@/assets/images/groupChat.png';
import pairChat from '@/assets/images/pairChat.png';
import Card from '@/components/commons/Card';
import { chatIdListState, loginState } from '@/recoil/atom';
import { chatIdListService } from '@/services/chatService';
import styles from '@/styles/chatting/ChattingPage.module.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';

function ChattingPage() {
  const login = useRecoilValue(loginState)
  const chatIdList = useRecoilValue(chatIdListState);
  const setChatIdList = useSetRecoilState(chatIdListState);

  const navigate = useNavigate();

  useEffect(() => {
    // api 채팅방 목록 조회
    chatIdListService(login.guestId).then((data) => {
      setChatIdList(data);
    });
  }, []);
  const toDetail = (chatId: number) => {
    navigate(`/chatdetail/${chatId}`);
  };
  const children = <div></div>;
  return (
    <>
      <div className={`FontBasic FontXL ${styles.heading}`}>채팅</div>
      <div
        onClick={() => toDetail(chatIdList.groupChatId)}
        className={`${styles.Button} ${styles.GroupChat} ${styles.Left} FontL FontBasic`}
      >
        <div>그룹 채팅방</div>
        <div className={styles.Background}>
          <img src={groupChat} alt="" />
        </div>
      </div>
      <div
        onClick={() => toDetail(chatIdList.manitoChatId)}
        className={`${styles.Button} ${styles.ManitoChat} ${styles.Right} FontL FontBasic`}
      >
        <div className={styles.Background}>
          <img src={pairChat} alt="" />
        </div>
        <div>마니또와 대화</div>
      </div>
      <div
        onClick={() => toDetail(chatIdList.manitiChatId)}
        className={`${styles.Button} ${styles.ManitiChat} ${styles.Left} FontL FontBasic`}
      >
        <div>마니띠와 대화</div>
        <div className={styles.Background}>
          <img src={pairChat} alt="" />
        </div>
      </div>
      <div className={styles.cardContainer}>
        <Card {...{ tag: 1, children: children }} />
      </div>
    </>
  );
}

export default ChattingPage;
