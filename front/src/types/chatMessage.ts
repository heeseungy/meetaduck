export interface MessageRes {
  id: string;
  messageType: boolean;
  content: string;
  createdTime: string;
  senderId: number;
  chatId: number;
}

export interface MessageReq {
  messageType: boolean;
  content: string;
  senderId: number;
  chatId: number;
}
