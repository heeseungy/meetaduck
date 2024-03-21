import { useEffect, useState } from 'react';

import { chatListLoadService } from '@/services/chatListLoadService';
import { chatSendMessageService } from '@/services/chatSendMessageService';
import styles from '@/styles/chatting/ChattingDetailPage.module.css';
import { MessageRes } from '@/types/chatMessage';
import { PaperPlaneTilt, Plus } from '@phosphor-icons/react';
import { Client, IMessage } from '@stomp/stompjs';

function ChattingDetailPage() {
  // const {chatId} = useParams();
  const chatId = 1;
  const [stompClient, setStompClient] = useState<Client | null>(null); // STOMP 클라이언트 상태 관리
  const [messages, setMessages] = useState<MessageRes[]>([]); // 채팅 메시지 목록 상태 관리
  const [writer, setWriter] = useState<string>(''); // 메시지 작성자 이름 상태 관리
  const [newMessage, setNewMessage] = useState<string>(''); // 새 메시지 입력 상태 관리

  useEffect(() => {
    chatListLoadService(chatId, setMessages);
    const client = new Client({
      brokerURL: `ws://localhost:8080/ws`, // Server WebSocket URL
      reconnectDelay: 5000, // 연결 끊겼을 때, 재연결시도까지 지연시간(ms)
      onConnect: () => {
        console.log('WebSocket 연결됨'); // 이 위치가 서버와의 연결이 성공적으로 이루어졌음을 보장
        client.subscribe(`/sub/api/chats/${chatId}/messages`, (message: IMessage) => {
          const msg: MessageRes = JSON.parse(message.body); // 메시지를 JSON형태로 파싱
          setMessages((prevMessages) => [...prevMessages, msg]); // 기존 메시지 목록에 새 메시지 추가
        });
      },
    });
    client.activate(); // STOMP 클라이언트 활성화
    setStompClient(client); // STOMP 클라이언트 상태 업데이트
    return () => {
      client.deactivate(); // 컴포넌트 언마운트 시, STOMP 클라이언트 비활성화
    };
  }, [chatId]); // chatId가 변경될 때마다 useEffect 실행

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      chatSendMessageService(chatId, newMessage, setNewMessage);
    }
  };

  const plusButtonHandler = () => {
    console.log('plus button 클릭');
  };

  return (
    <div className={styles.bgc}>
      <div className={styles.chatListArea}>
        <ul>
          {messages.map((msg) => (
            <li key={msg.id}>
              {msg.senderId}: {msg.content} ({msg.createdTime})
              <hr />
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.chatArea}>
        <button className={styles.plusBtn} onClick={plusButtonHandler}>
          <Plus size={32} />
        </button>
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
          className={styles.inputArea}
        />
        <button onClick={sendMessage}>
          <PaperPlaneTilt size={32} />
        </button>
      </div>
    </div>
  );
}

export default ChattingDetailPage;
