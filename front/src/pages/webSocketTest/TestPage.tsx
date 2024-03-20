
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

interface MessageRes {
  messageId: number;
  messageType: boolean;
  content: string;
  createdTime: string;
  senderId: number;
  chatId: number;
}

const TestPage = () => {
  const [messages, setMessages] = useState<MessageRes[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatId = 1; // 예시로 사용되는 chatId
  let stompClient: Stomp.Client | null = null;

  useEffect(() => {
    const socket = new SockJS('/ws');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      stompClient?.subscribe(`/sub/chats/${chatId}/messages`, function (message) {
        const newMsg: MessageRes = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMsg]);
      });
    });

    // WebSocket 연결 해제
    return () => {
      if (stompClient) {
        stompClient.disconnect(() => {
          console.log('Disconnected');
        });
      }
    };
  }, []);

  const sendMessage = () => {
    fetch(`api/chats/${chatId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: newMessage,
        // 필요한 다른 필드
      }),
    });
    setNewMessage('');
  };

  return (
    <div>
      <h1>Test Page</h1>
      <ul>
        {messages.map((msg) => (
          <li key={msg.messageId}>
            {msg.senderId}: {msg.content} ({msg.createdTime})
          </li>
        ))}
      </ul>
      <div>
        <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
        <button onClick={sendMessage}>Send!</button>
      </div>
    </div>
  );
};

export default TestPage;
