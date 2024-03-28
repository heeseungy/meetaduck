import { Client, IMessage } from "@stomp/stompjs"; // STOMP 프로토콜을 사용하기 위한 라이브러리를 가져옵니다.
import styles from '@/styles/webSocket/TestPage2.module.css';
import axios from "axios"; // HTTP 클라이언트 라이브러리를 가져옵니다.
import { useEffect, useState } from 'react';

interface MessageReq {
  messageType: boolean;
  content: string;
  senderId: number;
  chatId: number;
}

interface MessageRes {
  id: string;
  messageType: boolean;
  content: string;
  createdTime: string;
  senderId: number;
  chatId: number;
}

function RabbitTestPage() {
  // const {chatId} = useParams();
  const chatId = 1;
  const [stompClient, setStompClient] = useState<Client | null>(null);  // STOMP 클라이언트 상태 관리
  const [messages, setMessages] = useState<MessageRes[]>([]); // 채팅 메시지 목록 상태 관리
  const [writer, setWriter] = useState<string>(""); // 메시지 작성자 이름 상태 관리
  const [newMessage, setNewMessage] = useState<string>(""); // 새 메시지 입력 상태 관리

  const loadMessages = async () => {
    try {
      const response = await axios.get(
        `https://j10c108.p.ssafy.io:8080/api/chats/${chatId}/messages`
      );
      console.log(response.data)
      // const messages
      setMessages(response.data);
    } catch (error) {
      console.error("채팅 내역 로드 실패", error);
    }
  };

  useEffect(() => {
    loadMessages();
    const client = new Client({
      brokerURL: `wss://localhost:8080/wss`,   // Server WebSocket URL
      reconnectDelay: 5000, // 연결 끊겼을 때, 재연결시도까지 지연시간(ms)
      onConnect: () => {
        console.log("WebSocket 연결됨"); // 이 위치가 서버와의 연결이 성공적으로 이루어졌음을 보장
        client.subscribe(`/exchange/message.exchange/chats.${chatId}.messages`, (message) => {
          const msg = JSON.parse(message.body);
          setMessages((prevMessages) => [...prevMessages, msg]);
        });
      },
    });
    client.activate();  // STOMP 클라이언트 활성화
    setStompClient(client); // STOMP 클라이언트 상태 업데이트
    return () => {
      client.deactivate();  // 컴포넌트 언마운트 시, STOMP 클라이언트 비활성화
    };
  }, [chatId]); // chatId가 변경될 때마다 useEffect 실행

  const sendMessage = async () => {
    if (newMessage.trim() !== "" && stompClient) {
      try {
        const messageReq = {
          messageType: false, // 메시지 타입 설정, 필요에 따라 조정 가능
          content: newMessage,
          senderId: 2, // 실제 애플리케이션에서는 사용자 인증 정보로부터 가져온 실제 사용자 ID를 사용해야 합니다.
          chatId: chatId,
        };
  
        // await axios.post(`https://localhost:8080/api/chats/${chatId}/messages`, messageReq);
            // STOMP를 사용하여 메시지 발행
        stompClient.publish({
          destination: `/pub/chats.${chatId}.messages`,
          body: JSON.stringify(messageReq),
        });
  
        setNewMessage(""); // 메시지 전송 후 입력 필드 초기화
      } catch (error) {
        console.error("메시지 전송 실패", error);
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
        <input 
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)
          }
        />
        <button onClick={sendMessage}>
          {/* <PaperPlaneTilt size={32} /> Add icon import or component */}
          전송
        </button>
      </div>
    </div>
  );
}

export default RabbitTestPage;