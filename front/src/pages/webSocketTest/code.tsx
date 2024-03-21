import { useEffect, useState } from "react"; // React의 훅을 가져옵니다.
import { Client, IMessage } from "@stomp/stompjs"; // STOMP 프로토콜을 사용하기 위한 라이브러리를 가져옵니다.
import axios from "axios"; // HTTP 클라이언트 라이브러리를 가져옵니다.
import { Link, useParams } from "react-router-dom"; // 라우터 관련 기능을 사용하기 위한 라이브러리를 가져옵니다.
import "./ChatPage.css"; // 채팅 페이지 스타일을 위한 CSS를 가져옵니다.

// 채팅 메시지를 보낼 때 사용되는 요청 객체의 인터페이스를 정의합니다.
interface ChatMessageReqeust {
  from: string;
  text: string;
  roomId: number;
}

// 채팅 메시지 응답 객체의 인터페이스를 정의합니다.
interface ChatMessageResponse{
  id: number;
  content: string;
  writer: string;
}

function ChatPage() {
  const { roomId } = useParams(); // 현재 방의 ID를 URL 파라미터에서 가져옵니다.
  const [stompClient, setStompClient] = useState<Client | null>(null); // STOMP 클라이언트 상태 관리
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]); // 채팅 메시지 목록 상태 관리
  const [writer, setWriter] = useState<string>(""); // 메시지 작성자 이름 상태 관리
  const [newMessage, setNewMessage] = useState<string>(""); // 새 메시지 입력 상태 관리

  useEffect(() => {
    const loadChatHistory = async () => { // 채팅 히스토리를 로드하는 함수
      try {
        const response = await axios.get(
          `http://localhost:8788/api/v1/rooms/${roomId}`
        );
        const messages = response.data.data.messageList as ChatMessageResponse[];
        setMessages(messages); // 응답으로 받은 메시지 목록으로 상태를 업데이트합니다.
      } catch (error) {
        console.error("채팅 내역 로드 실패", error);
      }
    };

    loadChatHistory(); // 컴포넌트가 마운트될 때 채팅 히스토리를 로드합니다.
    const client = new Client({
      brokerURL: "ws://localhost:8788/chat", // 서버 WebSocket URL
      reconnectDelay: 5000, // 연결이 끊긴 후 재연결 시도까지의 지연 시간(밀리초)
      onConnect: () => {
        client.subscribe(`/topic/public/rooms/${roomId}`, (message: IMessage) => {
          const msg: ChatMessageResponse = JSON.parse(message.body); // 메시지를 JSON 형태로 파싱
          setMessages((prevMessages) => [...prevMessages, msg]); // 기존 메시지 목록에 새 메시지 추가
        });
      },
    });
    client.activate(); // STOMP 클라이언트 활성화
    setStompClient(client); // STOMP 클라이언트 상태 업데이트
    return () => {
      client.deactivate(); // 컴포넌트 언마운트 시 STOMP 클라이언트 비활성화
    };
  }, [roomId]); // roomId가 변경될 때마다 이 useEffect 훅이 실행됩니다.

  const sendMessage = () => { // 메시지를 보내는 함수
    if (stompClient && newMessage) {
      const chatMessage: ChatMessageReqeust = {
        from: writer,
        text: newMessage,
        roomId: parseInt(roomId || ""),
      };
      stompClient.publish({
        destination: `/app/chat/rooms/${roomId}/send`,
        body: JSON.stringify(chatMessage), // 메시지 객체를 JSON 문자열로 변환
      });
      console.log(messages); // 현재 메시지 목록을 콘솔에 출력 (디버깅 목적)
      setNewMessage(""); // 입력 필드 초기화
    }
  };

  return (
    <div className="chat-container">
      <
