import uploadImage from '@/shared/assets/icons/upload-image.svg';

import type { ChatMessage } from '../model/types';

interface ChatMessageListProps {
  messages: ChatMessage[];
}

export function ChatMessageList({ messages }: ChatMessageListProps) {
  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-5">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex items-end gap-2 ${msg.isMine ? 'flex-row-reverse' : 'flex-row'}`}>
          {!msg.isMine && (
            <div className="bg-muted h-8 w-8 flex-shrink-0 overflow-hidden rounded-full">
              <img src={uploadImage} alt="상대방 프로필" className="h-full w-full object-cover" />
            </div>
          )}

          <div className={`flex flex-col gap-1 ${msg.isMine ? 'items-end' : 'items-start'}`}>
            <div
              className={`max-w-[240px] px-4 py-2.5 text-sm ${
                msg.isMine
                  ? 'rounded-[18px_18px_4px_18px] bg-[#3C9E00] text-white'
                  : 'bg-muted text-foreground rounded-[18px_18px_18px_4px]'
              }`}
            >
              {msg.content}
            </div>

            {msg.image && (
              <div className="max-w-[240px] overflow-hidden rounded-xl">
                <img src={msg.image} alt="첨부 이미지" className="w-full object-cover" />
              </div>
            )}

            <span className="text-muted-foreground text-xs">{msg.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
