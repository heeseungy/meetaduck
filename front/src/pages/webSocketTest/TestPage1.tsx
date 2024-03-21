import React, { useRef, useState, useContext, createContext } from 'react';

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
    return (
        <WebSocketProvider>
            <h1>Test Page</h1>
            <Chatting />
            <TextInputBox />
        </WebSocketProvider>
    );
}

export default TestPage;