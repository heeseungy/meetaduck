import { useEffect, useState, useRef, useContext, createContext } from 'react';

// Axios 서비스와 CSS 모듈을 임포트합니다.
import { Axios } from '@/services/axios';
import styles from '@/styles/webSocket/TestPage2.module.css';
// 리액트 아이콘 라이브러리에서 PaperPlaneTilt 아이콘을 임포트합니다.
import { PaperPlaneTilt } from '@phosphor-icons/react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

// 메시지 객체에 대한 TypeScript 인터페이스 정의
interface MessageRes {
  id: string;
  messageType: boolean;
  content: string;
  createdTime: string;
  senderId: number;
  chatId: number;
}

// // WebSocketContext 정의
// const WebSocketContext = createContext<any>(null);

// // WebSocketProvider 구성
// const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
//     const webSocketUrl = `ws://localhost:8080/ws`
//     let ws = useRef<WebSocket | null>(null);

//     if (!ws.current) {
//         ws.current = new WebSocket(webSocketUrl);
//         ws.current.onopen = () => {
//             console.log("connected to " + webSocketUrl);
//         }
//         ws.current.onclose = (error) => {
//             console.log("disconnect from " + webSocketUrl);
//             console.log(error);
//         };
//         ws.current.onerror = (error) => {
//             console.log("connection error " + webSocketUrl);
//             console.log(error);
//         };
//     }

//     return (
//         <WebSocketContext.Provider value={ws}>
//             {children}
//         </WebSocketContext.Provider>
//     );
// };


function TestPage2() {
  // 메시지 목록과 새 메시지 내용을 위한 상태를 선언합니다.
  const [messages, setMessages] = useState<MessageRes[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [stompClient, setStompClient] = useState<any>(null);
  const chatId = 1; // 채팅 ID 예시 값

  // 메시지를 서버로 전송하는 함수
  const sendMessage = () => {
    if (newMessage && stompClient) {
      const messageReq = {
        messageType: false, // 텍스트 메시지의 경우 false로 설정
        content: newMessage,
        senderId: 1, // 우선 1로 고정
        chatId: 1, // 우선 1로 고정
      };
      // '/pub/api/chats/{chatId}/messages' 경로로 메시지 전송
      stompClient.send(`/pub/api/chats/1/messages`, {}, JSON.stringify(messageReq));
      setNewMessage(''); // 메시지 전송 후 입력 필드 초기화
    }
  };
  // 서버에서 메시지를 가져오는 비동기 함수
  const getMessage = async () => {
    try {
      const response = await Axios.get<MessageRes[]>('/api/chats/1/messages');
      console.log('success : ', response.data);
      setMessages(response.data); // 응답 데이터로 메시지 목록을 업데이트합니다.
    } catch (err) {
      console.log('err : ', err); // 오류 발생 시 콘솔에 출력
    }
  };

  // 컴포넌트 마운트 시 getMessage 함수를 호출합니다.
  useEffect(() => {
    getMessage();
  }, []);

  // UI를 구성하는 JSX 리턴 부분
  return (
    <div className={styles.Box}>
      <div className={styles.Input}>
        <ul>
          {messages.map((msg) => (
            // 각 메시지를 리스트 아이템으로 렌더링
            <li key={msg.id}> 
              {msg.senderId}: {msg.content} ({msg.createdTime})
              <hr />
            </li>
          ))}
        </ul>
        {/* 새 메시지 입력 필드 */}
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} /> 
        {/* // 메시지 전송 버튼 */}
        <button onClick={sendMessage}> 
          <PaperPlaneTilt size={32} />
        </button>
      </div>
    </div>
  );
}

export default TestPage2;
