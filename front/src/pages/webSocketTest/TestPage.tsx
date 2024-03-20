import React, { useEffect, useRef, useState, useContext, createContext } from 'react';
import { Axios } from '@/services/axios';

// 메시지 객체에 대한 TypeScript 인터페이스 정의
interface MessageRes {
    id: string;
    messageType: boolean;
    content: string;
    createdTime: string;
    senderId: number;
    chatId: number;
  }

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

// WebSocketContext 정의
const WebSocketContext = createContext<any>(null);

// WebSocketProvider 구성
const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
    const webSocketUrl = `ws://localhost:8080/ws`
    let ws = useRef<WebSocket | null>(null);

    if (!ws.current) {
        ws.current = new WebSocket(webSocketUrl);
        ws.current.onopen = () => {
            console.log("connected to " + webSocketUrl);
        }
        ws.current.onclose = (error) => {
            console.log("disconnect from " + webSocketUrl);
            console.log(error);
        };
        ws.current.onerror = (error) => {
            console.log("connection error " + webSocketUrl);
            console.log(error);
        };
    }

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    );
};

// Chatting 컴포넌트
function Chatting() {
    const ws = useContext(WebSocketContext);
    const [items, setItems] = useState<string[]>([]);

    const addItem = (item: string) => {
        setItems((prevItems) => [...prevItems, item]);
    };

    if (ws.current) {
        ws.current.onmessage = (evt: MessageEvent) => {
            const data = JSON.parse(evt.data);
            addItem(data.chat);
        };
    }

    return (
        <ul>
            {items.map((message, index) => (
                <li key={index}>{message}</li>
            ))}
        </ul>
    );
}

// TextInputBox 컴포넌트
function TextInputBox() {
    const [message, setMessage] = useState("");
    const ws = useContext(WebSocketContext);

    const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const handleClickSubmit = () => {
        if (ws.current) {
            ws.current.send(JSON.stringify({
                chat: message
            }));
        }
        setMessage('');
    }

    return (
        <div>
            <input type="text" value={message} onChange={handleChangeText}></input>
            <button type="button" onClick={handleClickSubmit}>Send!</button>
        </div>
    );
}

// TestPage 컴포넌트에 통합
function TestPage() {
     // 메시지 목록과 새 메시지 내용을 위한 상태를 선언합니다.
    const [messages, setMessages] = useState<MessageRes[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const chatId = 1; // 채팅 ID 예시 값
    return (
        <WebSocketProvider>
            <h1>Test Page</h1>
            <Chatting />
            <TextInputBox />
        </WebSocketProvider>
    );
}

export default TestPage;
