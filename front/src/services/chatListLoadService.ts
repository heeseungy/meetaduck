import { MessageRes } from '@/types/chatMessage';

import { Axios } from './axios';

export async function chatListLoadService(chatId: number, setMessages: (messages: MessageRes[]) => void) {
  try {
    const response = await Axios.get(`/api/chats/${chatId}/messages`);
    console.log(response.data);
    setMessages(response.data);
  } catch (error) {
    console.error('채팅 내역 로드 실패', error);
  }
}
