import { useEffect, useState } from 'react';

import { Axios } from '@/services/axios';
import styles from '@/styles/webSocket/TestPage2.module.css';
import { PaperPlaneTilt } from '@phosphor-icons/react';

interface MessageRes {
  id: string;
  messageType: boolean;
  content: string;
  createdTime: string;
  senderId: number;
  chatId: number;
}
function TestPage2() {
  const [messages, setMessages] = useState<MessageRes[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatId = 1; // 예시로 사용되는 chatId

  const sendMessage = () => {};
  const getMessage = async () => {
    try {
      const response = await Axios.get<MessageRes[]>('/api/chats/1/messages');
      console.log('success : ', response.data);
      setMessages(response.data);
    } catch (err) {
      console.log('err : ', err);
    }
  };

  useEffect(() => {
    getMessage();
  }, []);
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
          <PaperPlaneTilt size={32} />
        </button>
      </div>
    </div>
  );
}

export default TestPage2;
