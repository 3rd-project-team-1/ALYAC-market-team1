export interface ChatMessage {
  id: string;
  content: string;
  isMine: boolean;
  time: string;
  image?: string;
}
