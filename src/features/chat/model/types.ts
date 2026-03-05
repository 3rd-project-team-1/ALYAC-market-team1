export interface ChatMessage {
  id: string;
  content: string;
  isMine: boolean;
  time: string;
  image?: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  lastMessage: string;
  date: string;
  isOnline: boolean;
}
