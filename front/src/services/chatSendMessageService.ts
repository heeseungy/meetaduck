import { Client } from '@stomp/stompjs';

export async function chatSendMessageService(
  stompClient: Client | null,
  senderId: number,
  chatId: number,
  message: string,
  setNewMessage: React.Dispatch<React.SetStateAction<string>>,
) {
  try {
    const messageReq = {
      messageType: false, // 메시지 타입 설정, 필요에 따라 조정 가능
      content: message.replace(/\n/gi, '<br>'),
      senderId: senderId, // 실제 애플리케이션에서는 사용자 인증 정보로부터 가져온 실제 사용자 ID를 사용해야 합니다.
      chatId: chatId,
    };

    // await Axios.post(`/api/chats/${chatId}/messages`, messageReq);
    stompClient!.publish({
      destination: `/pub/chats.${chatId}.messages`,
      body: JSON.stringify(messageReq),
    });
    setNewMessage(''); // 메시지 전송 후 입력 필드 초기화
  } catch (error) {
    console.error('메시지 전송 실패', error);
  }
}
