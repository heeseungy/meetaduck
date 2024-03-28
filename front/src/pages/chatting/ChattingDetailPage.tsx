import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ChatListArea from '@/components/chatting/ChatListArea';
import ChattingHeader from '@/components/chatting/ChattingHeader';
import ChattingInputArea from '@/components/chatting/ChattingInputArea';
import { chatIdListState, loginState } from '@/recoil/atom';
import { chatListLoadService } from '@/services/chatListLoadService';
import styles from '@/styles/chatting/ChattingDetailPage.module.css';
import { MessageRes } from '@/types/chatMessage';
import { Client, IMessage } from '@stomp/stompjs';
import { useRecoilValue } from 'recoil';

function ChattingDetailPage() {
  const login = useRecoilValue(loginState);
  const chatIdList = useRecoilValue(chatIdListState);
  const chatId = useParams().chatId!;
  const [stompClient, setStompClient] = useState<Client | null>(null); // STOMP 클라이언트 상태 관리
  const [messages, setMessages] = useState<MessageRes[]>([]); // 채팅 메시지 목록 상태 관리
  const tag: string =
    +chatId === chatIdList.groupChatId
      ? 'groupChat'
      : +chatId === chatIdList.manitiChatId
        ? 'manitiChat'
        : 'manitoChat';
  useEffect(() => {
    //chat
    chatListLoadService(+chatId, setMessages);
    const client = new Client({
      brokerURL: `ws://localhost:8080/wss`, // Server WebSocket URL
      reconnectDelay: 5000, // 연결 끊겼을 때, 재연결시도까지 지연시간(ms)
      onConnect: () => {
        console.log('WebSocket 연결됨'); // 이 위치가 서버와의 연결이 성공적으로 이루어졌음을 보장
        client.subscribe(`/exchange/message.exchange/chats.${chatId}.messages`, (message) => {
          const msg = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, msg]);
          // client.subscribe(`/sub/api/chats/${chatId}/messages`, (message: IMessage) => {
          //   const msg: MessageRes = JSON.parse(message.body); // 메시지를 JSON형태로 파싱
          //   setMessages((prevMessages) => [...prevMessages, msg]); // 기존 메시지 목록에 새 메시지 추가
        });
      },
    });
    client.activate(); // STOMP 클라이언트 활성화
    setStompClient(client); // STOMP 클라이언트 상태 업데이트
    return () => {
      client.deactivate(); // 컴포넌트 언마운트 시, STOMP 클라이언트 비활성화
    };
  }, [chatId]); // chatId가 변경될 때마다 useEffect 실행

  return (
    <div className={styles.bgc}>
      <ChattingHeader {...{ tag: tag }} />
      <ChatListArea {...{ tag: tag, messages: messages }} />
      <ChattingInputArea {...{ senderId: login.guestId }} />
    </div>
  );
}

export default ChattingDetailPage;
