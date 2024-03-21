import { useEffect, useState } from 'react';

import { chatListLoadService } from '@/services/chatListLoadService';
import styles from '@/styles/webSocket/TestPage2.module.css';
import { MessageRes, MessageReq } from '@/types/chatMessage';
import { Client, IMessage } from '@stomp/stompjs';
import axios from 'axios';




function ChatTestPage() {
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

  // const sendMessage = async () => { // 메시지를 보내는 함수
  //   if (stompClient && newMessage) {
  //     const Message : MessageReq = {
  //       messageType: false,
  //       content: newMessage,
  //       senderId: 1,
  //       chatId: chatId,
  //     };
  //     stompClient.publish({
  //       destination: `/pub/api/chats/${chatId}/messages`,
  //       body: JSON.stringify(Message),
  //     });
  //     console.log(messages);  // 현재 메시지 목록을 콘솔에 출력
  //     setNewMessage("");
  //   }
  // };

  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      try {
        const messageReq = {
          messageType: false, // 메시지 타입 설정, 필요에 따라 조정 가능
          content: newMessage,
          senderId: 1, // 실제 애플리케이션에서는 사용자 인증 정보로부터 가져온 실제 사용자 ID를 사용해야 합니다.
          chatId: chatId,
        };

        await axios.post(`http://localhost:8080/api/chats/${chatId}/messages`, messageReq);

        setNewMessage(''); // 메시지 전송 후 입력 필드 초기화
      } catch (error) {
        console.error('메시지 전송 실패', error);
      }
    }
  };

  return (
    <div className={styles.Box}>
      <div className={styles.Input}>
        <ul>
          {messages.map((msg) => (
            <li key={msg.id}>
              {msg.senderId}: {msg.content} ({msg.createdTime})
              <hr />
            </li>
          ))}
        </ul>
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button onClick={sendMessage}>
          {/* <PaperPlaneTilt size={32} /> Add icon import or component */}
          전송
        </button>
      </div>
    </div>
  );
}

export default ChatTestPage;
