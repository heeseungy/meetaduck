import React, { useEffect, useState, useRef, createContext, useContext } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Axios } from '@/services/axios';
import styles from '@/styles/webSocket/TestPage2.module.css';
import { PaperPlaneTilt } from '@phosphor-icons/react';

// 메시지 객체에 대한 TypeScript 인터페이스 정의
interface MessageRes {
  id: string;
  messageType: boolean;
  content: string;
  createdTime: string;
  senderId: number;
  chatId: number;
}

// WebSocketContext 생성
const WebSocketContext = createContext<any>(null);

// WebSocketProvider 구성
const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [stompClient, setStompClient] = useState<any>(null);

  useEffect(() => {
    // SockJS와 Stomp를 사용하여 WebSocket 연결을 설정
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);
    setStompClient(stompClient);

    stompClient.connect({}, () => {
      console.log("Connected to the WebSocket");

      // 이 예제에서는 연결된 후 특정 동작을 수행하지 않지만,
      // 필요한 경우 여기에 메시지 구독 등의 로직을 추가할 수 있습니다.
    }, (error) => {
      console.log("Could not connect to WebSocket", error);
    });

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (stompClient !== null) {
        stompClient.disconnect(() => {
          console.log("Disconnected from WebSocket");
        });
      }
    };
  }, []);

  return (
    <WebSocketContext.Provider value={stompClient}>
      {children}
    </WebSocketContext.Provider>
  );
};

// TestPage2 컴포넌트
function TestPage2() {
  const [messages, setMessages] = useState<MessageRes[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const stompClient = useContext(WebSocketContext);
  const chatId = 1; // 채팅방 ID 예시 값

  // 서버에서 메시지를 가져오는 함수
  const getMessages = async () => {
    try {
      const response = await Axios.get<MessageRes[]>('/api/chats/1/messages');
      setMessages(response.data);
      console.log('Messages loaded:', response.data);
    } catch (err) {
      console.log('Error loading messages:', err);
    }
  };

  // 메시지를 서버로 전송하는 함수
  const sendMessage = () => {
    if (newMessage && stompClient) {
      const messageData = {
        messageType: false, // 예시: false는 텍스트 메시지를 의미
        content: newMessage,
        senderId: 1, // 예시: 실제 애플리케이션에서는 동적으로 설정
        chatId: chatId,
      };

      stompClient.send(`/pub/api/chats/${chatId}/messages`, {}, JSON.stringify(messageData));
      setNewMessage(''); // 메시지 전송 후 입력 필드 초기화
    }
  };

  // 컴포넌트 마운트 시 메시지 로딩
  useEffect(() => {
    getMessages();
  }, []);

  return (
    <WebSocketProvider>
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
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>
            <PaperPlaneTilt size={32} />
            </button>
        </div>
      </div>
    </WebSocketProvider>
  );
}

export default function App() {
  return (
    <WebSocketProvider>
      <TestPage2 />
    </WebSocketProvider>
  );
}

// default export TestPage3;
