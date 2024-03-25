import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { chatSendMessageService } from '@/services/chatSendMessageService';
import styles from '@/styles/chatting/ChattingInputArea.module.css';
import { PaperPlaneTilt, Plus } from '@phosphor-icons/react';

function ChattingInputArea() {
  // const {chatId} = useParams();
  const chatId = 1;
  const [newMessage, setNewMessage] = useState<string>(''); // 새 메시지 입력 상태 관리
  const sendMessage = async () => {
    if (newMessage.trim() !== '') {
      chatSendMessageService(chatId, newMessage, setNewMessage);
    }
  };

  const plusButtonHandler = () => {
    console.log('plus button 클릭');
  };

  return (
    <>
      <div>
        <button className={styles.plusBtn} onClick={plusButtonHandler}>
          <Plus size={32} />
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className={styles.inputArea}
        />
        <button onClick={sendMessage}>
          <PaperPlaneTilt size={32} />
        </button>
      </div>
    </>
  );
}

export default ChattingInputArea;
